const part1 = require('./unique_clinical_data_part1');
const part2 = require('./unique_clinical_data_part2');

const combined = { ...part1, ...part2 };
const slugs = Object.keys(combined);
console.log('Total slugs covered:', slugs.length);

const allHeadings = [];
slugs.forEach(s => {
  combined[s].blocks.forEach(b => {
    allHeadings.push({ slug: s, heading: b.heading });
  });
});

const headingCounts = {};
allHeadings.forEach(h => {
  headingCounts[h.heading] = (headingCounts[h.heading] || 0) + 1;
});

const duplicateHeadings = Object.entries(headingCounts).filter(([h, count]) => count > 1);
console.log('Duplicate headings in new clinical data:', duplicateHeadings.length);
if (duplicateHeadings.length > 0) {
  console.log(duplicateHeadings);
} else {
  console.log('All headings are 100% UNIQUE!');
}
