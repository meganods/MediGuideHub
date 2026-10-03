const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, '..', 'src', 'lib', 'mockData.ts');
let mockData = fs.readFileSync(mockDataPath, 'utf8');

// 1. Remove Verified Patient reviews entirely
// We can use regex to remove block objects where userRole is "Verified Patient"
// Example: { id: "c4", userName: "...", userRole: "Verified Patient", comment: "...", date: "..." },
mockData = mockData.replace(/\{\s*id:\s*["'][^"']+["'],\s*userName:\s*["'][^"']+["'],\s*userRole:\s*["']Verified Patient["'][\s\S]*?\}(,\s*|\s*(?=\]))/g, '');

// 2. Replace "911" with "112/911 or local emergency services"
mockData = mockData.replace(/\b911\b/g, "112 (India) / 911 (US) or your local emergency number");

// 3. Fix "peer-reviewed" -> "medically reviewed" globally in mockData
mockData = mockData.replace(/peer-reviewed/g, "medically-reviewed");
mockData = mockData.replace(/Peer-Reviewed/g, "Medically-Reviewed");

// 4. Update publishedAt from 2026-08-08 or 2026-08-10 to the current date dynamically (e.g. 2026-10-03)
mockData = mockData.replace(/"publishedAt":\s*"2026-08-\d{2}"/g, `"publishedAt": "2026-10-03"`);

fs.writeFileSync(mockDataPath, mockData, 'utf8');
console.log('mockData.ts updated successfully.');

// Let's also fix TSX files
function replaceInFile(filePath, searchRegex, replaceText) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(searchRegex, replaceText);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

const srcPath = path.join(__dirname, '..', 'src');

// Fix global layouts and pages
replaceInFile(path.join(srcPath, 'app', 'page.tsx'), /Physician-Reviewed/g, "Medically-Reviewed");
replaceInFile(path.join(srcPath, 'app', 'layout.tsx'), /Physician-Reviewed/g, "Medically-Reviewed");
replaceInFile(path.join(srcPath, 'app', 'manifest.ts'), /Physician-Reviewed/g, "Medically-Reviewed");
replaceInFile(path.join(srcPath, 'app', 'feed.xml', 'route.ts'), /Physician-Reviewed/g, "Medically-Reviewed");

replaceInFile(path.join(srcPath, 'app', 'about', 'page.tsx'), /peer-reviewed/g, "medically-reviewed");
replaceInFile(path.join(srcPath, 'app', 'about', 'page.tsx'), /Physician-Reviewed/g, "Medically-Reviewed");

replaceInFile(path.join(srcPath, 'app', 'authors', 'page.tsx'), /peer-reviewed/g, "medically-reviewed");
replaceInFile(path.join(srcPath, 'app', 'authors', 'page.tsx'), /Peer-Reviewed/g, "Medically-Reviewed");
replaceInFile(path.join(srcPath, 'app', 'authors', 'page.tsx'), /Physician-Reviewed/g, "Medically-Reviewed");

replaceInFile(path.join(srcPath, 'app', 'medical-review-board', 'page.tsx'), /peer-reviewed/g, "medically-reviewed");
replaceInFile(path.join(srcPath, 'app', 'author', '[slug]', 'page.tsx'), /peer-reviewed/g, "medically-reviewed");
replaceInFile(path.join(srcPath, 'app', 'blog', '[slug]', 'page.tsx'), /Peer-Reviewed/g, "Medically-Reviewed");

replaceInFile(path.join(srcPath, 'components', 'HomeClientView.tsx'), /peer-reviewed/g, "medically-reviewed");
replaceInFile(path.join(srcPath, 'components', 'HomeClientView.tsx'), /Physician-Reviewed/g, "Medically-Reviewed");

replaceInFile(path.join(srcPath, 'components', 'SitemapClientView.tsx'), /peer-reviewed/g, "medically-reviewed");
replaceInFile(path.join(srcPath, 'components', 'CookieConsent.tsx'), /physician-reviewed/g, "medically-reviewed");
replaceInFile(path.join(srcPath, 'components', 'Footer.tsx'), /physician-reviewed/g, "medically-reviewed");

// Replace 911 in ContactClientView and medical-disclaimer
replaceInFile(path.join(srcPath, 'components', 'ContactClientView.tsx'), /911\/112/g, "112 (India) / 911 (US)");
replaceInFile(path.join(srcPath, 'app', 'medical-disclaimer', 'page.tsx'), /102\/112 in India, 911 in the United States/g, "112 in India, 911 in the United States");

