export const corPrincipal = '#59b6ff';
export const corSecundaria = '#706ef9';
export const corTextos = '#f2f2f2';
export const corFundo = '#0d0d0d';
export const corFundo2 = '#262626';


const Estilos = {
    conteudo: {
        flex: 1,
        width: '100%',
        backgroundColor: corFundo, // Fundo escuro para consistência com a paleta
    },
    titulo: {
        textAlign: "center",
        fontSize: 26, // Tamanho ajustado para melhor legibilidade
        color: "#2C3E50", // Azul-escuro para um visual elegante
        fontWeight: "bold",
        marginBottom: 20,
        letterSpacing: 1.5, // Maior espaçamento entre letras
    },
    texto: {
        textAlign: "center",
        fontSize: 18, // Tamanho ajustado para subtítulos ou textos menores
        color: "#2C3E50", // Azul-escuro para um visual elegante
        fontWeight: "500", // Peso intermediário para contraste
        marginBottom: 15,
        letterSpacing: 1,
    },
    botao: {
        backgroundColor: corPrincipal, // Cor principal para destaque
        color: "#fff", // Texto branco
        padding: 12, // Maior espaçamento interno
        borderRadius: 25, // Bordas mais arredondadas
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        width: 160, // Largura ajustada
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: 1.2,
    },
    input: {
        backgroundColor: '#fff', // Fundo branco para contraste
        borderRadius: 15, // Bordas arredondadas
        padding: 12, // Espaçamento interno ajustado
        marginBottom: 15,
        fontSize: 16,
        color: '#333', // Texto escuro
        borderBottomWidth: 1.5, // Borda inferior mais espessa
        width: '100%', // Largura ajustada para melhor alinhamento
        borderColor: '#ccc', // Borda cinza clara
        borderStyle: 'solid',
    },
    inputContainer: {
        width: '100%', // Largura ajustada para alinhar com os inputs
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
};

export default Estilos;