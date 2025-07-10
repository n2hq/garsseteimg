module.exports = {
    apps: [
        {
            name: "tpics",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3333
            },
            watch: false,
            max_memory_restart: "500M"
        }
    ]
};