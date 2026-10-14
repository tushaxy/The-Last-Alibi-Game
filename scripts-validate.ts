import { validateCaseData } from "./src/lib/validator";
import { ALL_CASES } from "./src/data/cases";

console.log(`Starting validation for ${ALL_CASES.length} cases...`);
const result = validateCaseData(ALL_CASES);

if (result.isValid) {
  console.log("✓ SUCCESS: All 4 cases passed 100% of validation rules!");
  process.exit(0);
} else {
  console.error("✗ VALIDATION ERRORS FOUND:");
  result.errors.forEach((e) => {
    console.error(`- [${e.caseId}] ${e.field}: ${e.message}`);
  });
  process.exit(1);
}
