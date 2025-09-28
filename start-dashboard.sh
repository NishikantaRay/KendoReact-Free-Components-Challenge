#!/bin/bash

echo "🚀 Starting Team Performance Dashboard..."
echo "📦 Installing dependencies if needed..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    yarn
fi

echo "🌟 Starting development server..."
echo "📱 The dashboard will open at: http://localhost:5173"
echo "🔥 Features included:"
echo "   • Employee Grid with filtering & sorting"
echo "   • Performance Charts (Line & Pie)"
echo "   • Date Range Picker for reports"
echo "   • Team & Role Dropdowns"
echo "   • Collapsible Sidebar Navigation"
echo "   • Add/Edit/Delete Employees"
echo "   • Export to CSV"
echo "   • Dark Mode & Compact Mode"
echo "   • Real-time Search"
echo "   • Notifications"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev