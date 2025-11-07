type Produto = {
  nome: string;
  quantidadeEmEstoque: number;
  valor: number;
};

export const produtosDB: Produto[] = [
  { nome: "Caderno A4", quantidadeEmEstoque: 120, valor: 12.50 },
  { nome: "Caneta Esferográfica", quantidadeEmEstoque: 250, valor: 1.20 },
  { nome: "Luminária de Mesa", quantidadeEmEstoque: 45, valor: 45.00 },
  { nome: "Teclado Mecânico", quantidadeEmEstoque: 30, valor: 220.00 },
  { nome: "Copo Térmico", quantidadeEmEstoque: 80, valor: 35.90 },
  { nome: "Fone de Ouvido Bluetooth", quantidadeEmEstoque: 60, valor: 149.90 },
  { nome: "Mouse Óptico", quantidadeEmEstoque: 180, valor: 35.00 },
  { nome: "Calculadora Científica", quantidadeEmEstoque: 100, valor: 60.00 },
  { nome: "Papel A4 (pacote 500 folhas)", quantidadeEmEstoque: 200, valor: 22.00 },
  { nome: "Organizador de Mesa", quantidadeEmEstoque: 0, valor: 25.00 },
  { nome: "Cadeira Ergonômica", quantidadeEmEstoque: 20, valor: 350.00 },
  { nome: "Monitor 24\"", quantidadeEmEstoque: 50, valor: 800.00 },
  { nome: "Mouse Gamer", quantidadeEmEstoque: 75, valor: 150.00 },
  { nome: "Microfone USB", quantidadeEmEstoque: 40, valor: 250.00 },
  { nome: "Cabo HDMI", quantidadeEmEstoque: 300, valor: 30.00 },
  { nome: "Pasta de Arquivo", quantidadeEmEstoque: 90, valor: 15.00 },
  { nome: "Lousa Magnética", quantidadeEmEstoque: 30, valor: 100.00 },
  { nome: "Projetor de Vídeo", quantidadeEmEstoque: 15, valor: 1200.00 },
  { nome: "Relógio de Mesa Digital", quantidadeEmEstoque: 120, valor: 40.00 },
  { nome: "Kit de Ferramentas", quantidadeEmEstoque: 0, valor: 75.00 }
];


export const produtosEmEstoque = () => {
    return produtosDB.filter(p => p.quantidadeEmEstoque > 0).map(p => p.nome)
}

export const produtosEmFalta = () => {
    return produtosDB.filter(p => p.quantidadeEmEstoque === 0).map(p => p.nome)
}