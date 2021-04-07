module.exports = {
    schemas: {
        log: {
            description: 'Log user input',
            tasks: [
                {
                    name: 'echo',
                    command: 'echo ${input1}',
                },
                {
                    name: 'echo_concat',
                    command: 'echo "input_repeated"',
                },
                {
                    name: 'echo_concat',
                    command: 'echo "${input2} ${input2}_repeated"',
                },
                {
                    name: 'log_prev',
                    command: function (answers) {
                        return `echo ${JSON.stringify(answers)}`;
                    },
                },
            ],
        },
        'new-npm-git': {
            description: 'initialize as an npm project and a git repo',
            tasks: [
                {
                    name: 'create_dir',
                    command: 'mkdir ${dir_name} && cd ${dir_name}',
                },
                {
                    name: 'npm_init_y',
                    command: 'npm init -y',
                },
                {
                    name: 'init_git',
                    command: 'git init .',
                },
                {
                    name: 'git_stage',
                    command: 'git add .',
                },
                {
                    name: 'git_commit',
                    command: 'git commit -m "${commit message}"',
                },
            ],
        },
    },
};
