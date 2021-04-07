let dir = '';
const cwd = () => dir;
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
                    command: 'mkdir ${dir_name}',
                },
                {
                    name: 'cd_dir',
                    command: function (answers) {
                        var dir = answers.dir_name;
                        return `cd ${answers.dir_name}`;
                    },
                    cwd,
                },
                {
                    name: 'npm_init_y',
                    command: 'npm init -y',
                    cwd,
                },
                {
                    name: 'init_git',
                    command: 'git init .',
                    cwd,
                },
                {
                    name: 'git_stage',
                    command: 'git add .',
                    cwd,
                },
                {
                    name: 'git_commit',
                    command: 'git commit -m "${commit message}"',
                    cwd,
                },
            ],
        },
    },
};
