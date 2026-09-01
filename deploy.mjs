/**
 * Publica a documentação no GitHub Pages.
 *
 * Existe porque `docusaurus deploy` decide o protocolo sozinho: sem
 * USE_SSH nem GIT_USER, ele olha a URL do remote e, se ela for
 * `git@github.com:...`, tenta SSH. Num terminal sem ssh-agent isso
 * falha com "Permission denied (publickey)" — que foi exatamente o
 * erro que travou o deploy antes.
 *
 * Aqui o protocolo é decidido por nós: HTTPS, com o usuário do
 * GitHub, aproveitando as credenciais que o git já guarda na máquina.
 * As variáveis são definidas em JavaScript, e não na linha de
 * comando, porque `VAR=valor comando` não funciona no cmd do Windows.
 */
import { spawnSync } from 'node:child_process'

const resultado = spawnSync(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['docusaurus', 'deploy'],
    {
        stdio: 'inherit',
        env: { ...process.env, USE_SSH: 'false', GIT_USER: 'abraaosantosdeveloper' },
    },
)

process.exit(resultado.status ?? 1)
