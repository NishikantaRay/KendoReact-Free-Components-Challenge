#!/bin/bash

echo "🔑 Kendo React License Setup Helper"
echo "=================================="
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created successfully!"
else
    echo "📄 .env file already exists."
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Get your Kendo React license key:"
echo "   • Trial: https://www.telerik.com/kendo-react-ui"
echo "   • Paid: Login to your Telerik account"
echo ""
echo "2. Edit the .env file and replace 'your_license_key_here' with your actual key:"
echo "   REACT_APP_KENDO_LICENSE_KEY=your_actual_license_key"
echo ""
echo "3. Restart the development server:"
echo "   npm run dev"
echo ""

# Check if the license key is already set
if grep -q "your_license_key_here" .env 2>/dev/null; then
    echo "⚠️  License key not yet configured in .env file"
else
    echo "✅ License key appears to be configured"
fi

echo ""
echo "📚 Need help? Check the README.md file for detailed instructions."