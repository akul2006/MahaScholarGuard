"""
Unit tests for MahaScholar Guard Rules Engine validation logic.
Tests:
1. Valid request with all documents present.
2. Valid request with missing documents.
3. Duplicate document codes handling.
4. Unknown scheme handling (HTTP 404).
5. Empty / invalid scheme ID handling (HTTP 400).
6. Marathi and English language support.
7. Unverified prototype rule labeling check.
"""

import unittest
from backend.main import (
    validate_documents,
    ValidateRequest,
    SCHEME_RULES,
)
from fastapi import HTTPException


class TestRulesEngine(unittest.TestCase):
    def test_all_documents_present_ebc(self):
        req = ValidateRequest(
            schemeId="spp-ebc-01",
            documentCodes=[
                "INCOME_CERT",
                "DOMICILE_CERT",
                "HSC_MARKSHEET",
                "COLLEGE_BONAFIDE",
                "RATION_CARD",
                "AADHAAR_CARD",
            ],
            language="en",
        )
        res = validate_documents(req)
        self.assertTrue(res.isReady)
        self.assertEqual(len(res.missingDocumentCodes), 0)
        self.assertEqual(len(res.presentDocumentCodes), 6)
        self.assertEqual(res.rulesetStatus, "prototype_unverified")
        self.assertIn("All 6 required documents are present", res.summaryEn)

    def test_missing_documents_ebc(self):
        # Only 2 of 6 uploaded
        req = ValidateRequest(
            schemeId="spp-ebc-01",
            documentCodes=["DOMICILE_CERT", "HSC_MARKSHEET"],
            language="en",
        )
        res = validate_documents(req)
        self.assertFalse(res.isReady)
        self.assertEqual(len(res.presentDocumentCodes), 2)
        self.assertEqual(len(res.missingDocumentCodes), 4)
        self.assertIn("INCOME_CERT", res.missingDocumentCodes)
        self.assertIn("4 of 6 required document(s) are missing", res.summaryEn)
        self.assertEqual(res.rulesetStatus, "prototype_unverified")
        self.assertTrue(len(res.warningEn) > 0)
        self.assertTrue(len(res.warningMr) > 0)

    def test_duplicate_document_codes(self):
        # Duplicates should be gracefully deduplicated
        req = ValidateRequest(
            schemeId="spp-ebc-01",
            documentCodes=[
                "DOMICILE_CERT",
                "DOMICILE_CERT",
                "DOMICILE_CERT",
                "HSC_MARKSHEET",
            ],
            language="en",
        )
        res = validate_documents(req)
        self.assertEqual(len(res.presentDocumentCodes), 2)
        self.assertEqual(len(res.missingDocumentCodes), 4)

    def test_unknown_scheme(self):
        req = ValidateRequest(
            schemeId="non-existent-scheme-999",
            documentCodes=["DOMICILE_CERT"],
            language="en",
        )
        with self.assertRaises(HTTPException) as ctx:
            validate_documents(req)
        self.assertEqual(ctx.exception.status_code, 404)
        self.assertIn("not recognized", ctx.exception.detail)

    def test_empty_scheme_id(self):
        req = ValidateRequest(
            schemeId="",
            documentCodes=["DOMICILE_CERT"],
            language="en",
        )
        with self.assertRaises(HTTPException) as ctx:
            validate_documents(req)
        self.assertEqual(ctx.exception.status_code, 400)

    def test_marathi_localization_returned(self):
        req = ValidateRequest(
            schemeId="spp-sc-02",
            documentCodes=["CASTE_CERT"],
            language="mr",
        )
        res = validate_documents(req)
        self.assertEqual(res.schemeNameMr, "अनुसूचित जातीच्या विद्यार्थ्यांसाठी मॅट्रिकोत्तर शिष्यवृत्ती")
        self.assertIn("कागदपत्र(े) अद्याप जोडलेली नाहीत", res.summaryMr)
        self.assertTrue(len(res.disclaimerMr) > 0)
        self.assertEqual(res.rulesetStatus, "prototype_unverified")

    def test_all_catalog_schemes_supported(self):
        for scheme_id in ["spp-ebc-01", "spp-sc-02", "spp-obc-03", "spp-st-04"]:
            self.assertIn(scheme_id, SCHEME_RULES)
            rule = SCHEME_RULES[scheme_id]
            self.assertEqual(rule["rulesetStatus"], "prototype_unverified")
            self.assertTrue(len(rule["requiredDocuments"]) > 0)


if __name__ == "__main__":
    unittest.main()

