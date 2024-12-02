const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(cors());

// Endpoint pour obtenir tous les projets
app.get('/projects', (req, res) => {
    fs.readFile('data/projects.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(JSON.parse(data));
    });
});

// Endpoint pour créer un nouveau projet
app.post('/projects', (req, res) => {
    fs.readFile('data/projects.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        const projects = JSON.parse(data);
        const projectId = `projet${Object.keys(projects).length + 1}`;
        projects[projectId] = { ...req.body, images: [] };
        fs.writeFile('data/projects.json', JSON.stringify(projects, null, 2), (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(projectId);
        });
    });
});

// Endpoint pour supprimer un projet
app.delete('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    fs.readFile('data/projects.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        const projects = JSON.parse(data);
        if (!projects[projectId]) {
            return res.status(404).send('Projet non trouvé');
        }
        const projectImages = projects[projectId].images;
        projectImages.forEach(imagePath => {
            fs.unlink(path.join(__dirname, imagePath), err => {
                if (err) {
                    console.error(`Erreur lors de la suppression de l'image : ${imagePath}`);
                }
            });
        });
        delete projects[projectId];
        fs.writeFile('data/projects.json', JSON.stringify(projects, null, 2), (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send('Projet supprimé');
        });
    });
});

// Endpoint pour uploader une image
app.post('/upload', upload.single('image'), (req, res) => {
    const projectId = req.body.projectId;
    fs.readFile('data/projects.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        const projects = JSON.parse(data);
        const imagePath = `/uploads/${req.file.filename}`;
        projects[projectId].images.push(imagePath);
        fs.writeFile('data/projects.json', JSON.stringify(projects, null, 2), (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(imagePath);
        });
    });
});

// Endpoint pour supprimer une image
app.delete('/projects/:projectId/images', (req, res) => {
    const { projectId } = req.params;
    const { imagePath } = req.body;

    fs.readFile('data/projects.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        const projects = JSON.parse(data);
        if (!projects[projectId]) {
            return res.status(404).send('Projet non trouvé');
        }
        const imageIndex = projects[projectId].images.indexOf(imagePath);
        if (imageIndex === -1) {
            return res.status(404).send('Image non trouvée');
        }
        projects[projectId].images.splice(imageIndex, 1);
        fs.writeFile('data/projects.json', JSON.stringify(projects, null, 2), (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            fs.unlink(path.join(__dirname, imagePath), (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send('Image supprimée');
            });
        });
    });
});

// Endpoint pour mettre à jour les détails d'un projet
app.put('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    fs.readFile('data/projects.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        const projects = JSON.parse(data);
        if (!projects[projectId]) {
            return res.status(404).send('Projet non trouvé');
        }
        projects[projectId] = { ...projects[projectId], ...req.body };
        fs.writeFile('data/projects.json', JSON.stringify(projects, null, 2), (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send('Projet mis à jour');
        });
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, () => {
    console.log('Serveur démarré sur le port 5000');
});
