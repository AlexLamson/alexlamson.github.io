const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = path.join(__dirname, '..');
const site = process.env.PAGES_OUTPUT ? path.resolve(process.env.PAGES_OUTPUT) : source;
const read = (root, relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

test('only public PDFs are present at site URLs', () => {
    const pdfs = fs.readdirSync(path.join(site, 'assets')).filter(name => name.endsWith('.pdf'));
    assert.deepEqual(pdfs.sort(), [
        'Alex-Lamson-Resume-Parseable.pdf',
        'Alex-Lamson-Resume.pdf',
        'NASA-REALM-AlexLamson.pdf',
    ]);
});

test('the published photo has no EXIF or XMP blocks', () => {
    const jpeg = fs.readFileSync(path.join(site, 'img/us.jpg'));
    assert.ok(!jpeg.includes(Buffer.from('Exif\0\0')));
    assert.ok(!jpeg.includes(Buffer.from('http://ns.adobe.com/xap/1.0/')));
});

test('published HTML avoids obsolete services and protects external script tags', () => {
    const pages = fs.readdirSync(site).filter(name => name.endsWith('.html'));
    pages.push('cheese/index.html');
    assert.ok(pages.includes('index.html'));
    for (const page of pages) {
        const html = read(site, page);
        assert.ok(!/(?:polyfill\.io|googletagmanager\.com|darksky\.net)/i.test(html), page);
        for (const tag of html.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<script\b[^>]*\bsrc=['"](?:https?:)?\/\/[^>]+>/gi)) {
            assert.match(tag[0], /\bsrc=['"]https:\/\//i, page);
            assert.match(tag[0], /\bintegrity=['"]sha384-[\w+/=]+['"]/i, page);
            assert.match(tag[0], /\bcrossorigin=['"]anonymous['"]/i, page);
        }
    }
});

test('the transit board requests JSON and keeps working with an empty transit response', () => {
    const display = { textContent: '' };
    const specialDay = { textContent: '' };
    let request;
    const $ = { ajax: options => { request = options; } };
    vm.runInNewContext(read(source, 'js/bus.js'), {
        $,
        document: { getElementById: id => id === 'times-display' ? display : specialDay },
        national_days: {},
        setInterval() {},
    });

    assert.equal(request.dataType, 'json');
    request.success([]);
    assert.equal(display.textContent, 'No upcoming departures.');
    request.error();
    assert.equal(display.textContent, 'Departure times are currently unavailable.');
});

test('the preview server is bound to loopback without directory listings', () => {
    const { scripts } = JSON.parse(read(source, 'package.json'));
    assert.match(scripts.serve, /(?:^| )-a 127\.0\.0\.1(?: |$)/);
    assert.match(scripts.serve, /(?:^| )-d false(?: |$)/);
});

test('the Pages build omits development files', { skip: site === source }, () => {
    for (const relativePath of [
        '.git', '_config.yml', 'node_modules', 'notes', 'package.json', 'package-lock.json', 'test',
    ]) {
        assert.ok(!fs.existsSync(path.join(site, relativePath)), relativePath);
    }
    assert.equal(read(site, 'CNAME').trim(), 'alexlamson.com');
    assert.equal([...read(site, 'stats.html').matchAll(/<math>/g)].length, 6);
});
