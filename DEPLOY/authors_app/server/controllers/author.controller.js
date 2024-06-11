const { Author } = require("../models/author.model");

module.exports.index = (req, res) => {
    res.json({ message: "Connected!" });
};

module.exports.createAuthor = async (req, res) => {
    const { name, lastName, quote } = req.body;
    try {
        const author = await Author.create({ name, lastName, quote });
        res.json(author);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.allAuthors = async (req, res) => {
    try {
        const authors = await Author.find({}).sort({ name: 1 });
        res.json(authors);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.oneAuthor = async (req, res) => {
    try {
        const author = await Author.findOne({ _id: req.params.id });
        if (!author) {
            return res.status(404).json({ message: "Autor no encontrado" });
        }
        res.json(author);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = await Author.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedAuthor) {
            return res.status(404).json({ message: "Autor no encontrado" });
        }
        res.json(updatedAuthor);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await Author.findOneAndDelete({ _id: req.params.id });
        if (!deletedAuthor) {
            return res.status(404).json({ message: "Autor no encontrado" });
        }
        res.json(deletedAuthor);
    } catch (err) {
        res.status(400).json(err);
    }
};
