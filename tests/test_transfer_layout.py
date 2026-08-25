import re
from pathlib import Path

STYLES_PATH = Path(__file__).resolve().parent.parent / "app" / "static" / "styles.css"


def _get_css_rule(css: str, selector: str) -> str:
    escaped = re.escape(selector)
    match = re.search(rf"{escaped}\s*\{{([^}}]*)\}}", css)
    return match.group(1) if match else ""


def test_transfer_form_actions_stay_within_viewport():
    """Regression test for the "Apply Transfer" button being pushed off-screen.

    .form-actions previously carried a fixed `margin-left: 600px`, which shoved
    the submit button far outside the visible form on any narrow/mobile viewport.
    """
    css = STYLES_PATH.read_text(encoding="utf-8")
    form_actions_rule = _get_css_rule(css, ".form-actions")

    assert form_actions_rule, ".form-actions rule should exist in styles.css"
    assert not re.search(r"margin-left\s*:\s*\d", form_actions_rule)
