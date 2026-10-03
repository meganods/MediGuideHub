const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, '..', 'src', 'lib', 'mockData.ts');
let mockData = fs.readFileSync(mockDataPath, 'utf8');

// We have 76 articles. Let's spread them over the last 150 days (approx 5 months), 
// which is about 1 article every 2 days.
const totalArticles = 76;
const daysToSpread = 150;
const endDate = new Date('2026-10-03T10:00:00Z'); // Current date anchor

let matchCount = 0;

mockData = mockData.replace(/"publishedAt":\s*"2026-10-03"/g, (match) => {
    // Calculate a date going backwards
    const daysToSubtract = Math.floor((matchCount / totalArticles) * daysToSpread);
    
    const randomHour = Math.floor(Math.random() * (17 - 9 + 1)) + 9; // Between 9 AM and 5 PM
    const randomMinute = Math.floor(Math.random() * 60);
    
    let postDate = new Date(endDate);
    postDate.setDate(postDate.getDate() - daysToSubtract);
    postDate.setHours(randomHour, randomMinute, 0, 0);
    
    // Format to YYYY-MM-DD
    const year = postDate.getFullYear();
    const month = String(postDate.getMonth() + 1).padStart(2, '0');
    const day = String(postDate.getDate()).padStart(2, '0');
    
    const newDateStr = `${year}-${month}-${day}`;
    
    matchCount++;
    return `"publishedAt": "${newDateStr}"`;
});

fs.writeFileSync(mockDataPath, mockData, 'utf8');
console.log(`Successfully spread dates for ${matchCount} articles across the last 5 months.`);
