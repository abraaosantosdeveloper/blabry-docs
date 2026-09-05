import {spawnSync} from 'node:child_process'

console.log('🚀 Iniciando deploy do Docusaurus...')

const docusaurus = process.platform === 'win32'
    ? './node_modules/.bin/docusaurus.cmd'
    : './node_modules/.bin/docusaurus'

const resultado = spawnSync(
    docusaurus,
    ['deploy'],
    {
        stdio: 'inherit',
        env: {
            ...process.env,
            USE_SSH: 'false',
            GIT_USER: 'abraaosantosdeveloper',
            GIT_TERMINAL_PROMPT: '0',
        },
        shell: false,
    },
)

if (resultado.error) {
    console.error('❌ Erro ao executar o deploy:')
    console.error(resultado.error)
}

console.log('📦 Processo finalizado.')
console.log('Código:', resultado.status)

process.exit(resultado.status ?? 1)