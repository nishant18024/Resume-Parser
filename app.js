const express = require('express');
const ResumeParser = require('resume-parser');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Existing endpoint to parse a resume file from a file path
app.post('/parseResumeFile', (req, res) => {
    const { filePath, outputDir } = req.body;

    if (!filePath || !outputDir) {
        return res.status(400).send('Missing filePath or outputDir');
    }

    ResumeParser
        .parseResumeFile(filePath, outputDir)
        .then(file => {
            res.json({ message: 'Yay! Resume parsed successfully', file });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// Existing endpoint to parse a resume from a URL
app.post('/parseResumeUrl', (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send('Missing URL');
    }

    ResumeParser
        .parseResumeUrl(url)
        .then(data => {
            res.json({ message: 'Yay! Resume parsed successfully', data });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// Existing endpoint to parse a specific resume URL
app.post('/resume', (req, res) => {
    const url = 'https://www.sparshsethi.com/Resume_SparshSethi.pdf';

    ResumeParser
        .parseResumeUrl(url)
        .then(data => {
            res.json({ message: 'Yay! Resume parsed successfully', data });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.get('/resumeFromUrl/:url', (req, res) => {
    const { url } = req.params;

    if (!url) {
        return res.status(400).send('Missing URL');
    }

    ResumeParser
        .parseResumeUrl(decodeURIComponent(url))
        .then(data => {
            res.json({ message: 'Yay! Resume parsed successfully', data });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
