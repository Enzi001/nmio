const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    // Load existing Excel file or create a new one
    let workbook;
    if (fs.existsSync('subscriptions.xlsx')) {
        workbook = xlsx.readFile('subscriptions.xlsx');
    } else {
        workbook = xlsx.utils.book_new();
    }

    // Get the first worksheet or create a new one
    let worksheet;
    if (workbook.SheetNames.length > 0) {
        worksheet = workbook.Sheets[workbook.SheetNames[0]];
    } else {
        worksheet = xlsx.utils.aoa_to_sheet([['Email']]);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Subscriptions');
    }

    // Append the new email
    const data = xlsx.utils.sheet_to_json(worksheet);
    data.push({ Email: email });
    const newWorksheet = xlsx.utils.json_to_sheet(data);
    workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

    // Save the updated Excel file
    xlsx.writeFile(workbook, 'subscriptions.xlsx');

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
