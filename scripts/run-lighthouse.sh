#!/bin/bash
# Run lighthouse tests for a specific config (desktop, mobile, or both)
# Usage: ./scripts/run-lighthouse.sh [desktop|mobile|both]

# Don't exit on error - we want to show diagnostics even if tests fail
set +e

# Load environment variables from .env.local if it exists
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

MODE="${1:-desktop}"

if [ "$MODE" != "desktop" ] && [ "$MODE" != "mobile" ] && [ "$MODE" != "both" ]; then
  echo "❌ Invalid mode: $MODE"
  echo "Usage: ./scripts/run-lighthouse.sh [desktop|mobile|both]"
  exit 1
fi

# Function to run a single lighthouse test
run_lighthouse_test() {
  local config_type="$1"
  local clear_results="${2:-true}"  # Default to clearing results
  local config_file=".lighthouserc.${config_type}.json"

  echo "======================================"
  if [ "$config_type" = "desktop" ]; then
    echo "🖥️  Running Desktop Lighthouse Tests"
  else
    echo "📱 Running Mobile Lighthouse Tests"
  fi
  echo "======================================"
  echo ""

  # Run lighthouse tests and capture exit code
  if [ "$config_type" = "mobile" ]; then
    # For mobile, don't rebuild if we just built for desktop
    yarn lhci autorun --config="$config_file" --no-lighthouserc
  else
    yarn lhci autorun --config="$config_file"
  fi
  local exit_code=$?

  # Copy results to test_results directory (regardless of pass/fail)
  mkdir -p test_results/lighthouse

  # Clear old lighthouse report files only if requested (not between runs in "both" mode)
  if [ "$clear_results" = "true" ]; then
    rm -f test_results/lighthouse/lhr-*.json test_results/lighthouse/lhr-*.html test_results/lighthouse/flags-*.json 2>/dev/null || true
  fi

  cp -r .lighthouseci/* test_results/lighthouse/ 2>/dev/null || true

  echo ""

  return $exit_code
}

# Handle "both" mode
if [ "$MODE" = "both" ]; then
  DESKTOP_EXIT=0
  MOBILE_EXIT=0

  # Build once for both tests
  yarn build

  # Clear old results once before running both tests
  mkdir -p test_results/lighthouse
  rm -f test_results/lighthouse/lhr-*.json test_results/lighthouse/lhr-*.html test_results/lighthouse/flags-*.json 2>/dev/null || true

  # Run desktop tests (don't clear results - we just did)
  run_lighthouse_test "desktop" "false"
  DESKTOP_EXIT=$?

  # Run mobile tests (don't clear results - keep desktop results too)
  run_lighthouse_test "mobile" "false"
  MOBILE_EXIT=$?

  # Show combined results
  echo "======================================"
  echo "📊 Summary of Results"
  echo "======================================"
  echo ""

  # Always print the scores, even if tests failed
  node scripts/print-lighthouse-scores.mjs || true

  # Exit with failure if either test failed
  if [ $DESKTOP_EXIT -ne 0 ] || [ $MOBILE_EXIT -ne 0 ]; then
    echo ""
    echo "❌ Tests completed with failures"
    if [ $DESKTOP_EXIT -ne 0 ]; then
      echo "   - Desktop tests failed (exit code: $DESKTOP_EXIT)"
    fi
    if [ $MOBILE_EXIT -ne 0 ]; then
      echo "   - Mobile tests failed (exit code: $MOBILE_EXIT)"
    fi
    echo ""
    exit 1
  fi

  echo ""
  echo "✅ All tests passed!"
  echo ""
  exit 0
fi

# Handle single mode (desktop or mobile)
yarn build

run_lighthouse_test "$MODE"
LHCI_EXIT=$?

echo "======================================"
echo "📊 Summary of Results"
echo "======================================"
echo ""

# Always print the scores, even if tests failed
node scripts/print-lighthouse-scores.mjs || true

# Exit with the lighthouse exit code
if [ $LHCI_EXIT -ne 0 ]; then
  echo ""
  echo "❌ Lighthouse tests failed (exit code: $LHCI_EXIT)"
  echo ""
  exit $LHCI_EXIT
fi

echo ""
echo "✅ All tests passed!"
echo ""

