module.exports = (app) => {
    app.use((_req, res) => {
        res.status(404).json({ message: "This route does not exist" });
    });

    app.use((err, req, res, _next) => {
        console.error("ERROR", req.method, req.path, err);

        if (!res.headersSent) {
            res
                .status(500)
                .json({
                    message: "Internal server error. Check the server console",
                });
        }
    });
};
