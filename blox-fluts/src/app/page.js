'use client'
// pages/index.js
import Head from 'next/head';
import styles from '../app/page.module.css';
import { useState } from 'react';

// Função para gerar URL da imagem baseado na categoria e nome
const getImageUrl = (name, category) => {
  // Normaliza o nome do arquivo (substitui caracteres especiais)
  const fileName = name
    .toLowerCase()
    .replace(/[\(\)]/g, '')        // remove parênteses
    .replace(/\s/g, '_')           // espaços por _
    .replace(/[^a-z0-9_\-]/g, '')  // remove caracteres especiais
    .replace(/_+/g, '_');          // remove _ duplicados
  
  // Mapeamento de categorias para pastas
  const folderMap = {
    fruits: 'fruits',
    swords: 'swords',
    guns: 'guns',
    fightingStyles: 'fightingStyles',
    accessories: 'accessories',
    races: 'races',
    dungeons: 'bosses',
    bosses: 'bosses',
    raids: 'raids',
    materials: 'materials'
  };
  
  const folder = folderMap[category] || category;
  
  // CORREÇÃO: usa .jpeg em vez de .png
  return `/${folder}/${fileName}.jpeg`;
};

// Função que gera um SVG fallback (se a imagem não existir)
const generateFallbackSvg = (name, category) => {
  const colors = {
    fruits: 'f7c948',
    swords: 'e74c3c',
    guns: '2ecc71',
    fightingStyles: '9b59b6',
    accessories: '3498db',
    races: 'e67e22',
    dungeons: '1abc9c',
    bosses: 'e74c3c',
    raids: 'f39c12',
    materials: '95a5a6'
  };
  
  const color = colors[category] || '6b7488';
  const letter = name.charAt(0).toUpperCase();
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23${color}' rx='8'/%3E%3Ctext x='60' y='72' text-anchor='middle' font-size='48' font-family='Arial' fill='%231a2332' font-weight='bold'%3E${encodeURIComponent(letter)}%3C/text%3E%3C/svg%3E`;
};

// Função para tentar carregar a imagem com fallback para .jpg
const getImageUrlWithFallback = (name, category) => {
  const baseUrl = getImageUrl(name, category);
  // Tenta primeiro .jpeg, se falhar tenta .jpg
  return baseUrl;
};

// Mapeamento de cores por categoria
const categoryColors = {
  fruits: '#f7c948',
  swords: '#e74c3c',
  guns: '#2ecc71',
  fightingStyles: '#9b59b6',
  accessories: '#3498db',
  races: '#e67e22',
  dungeons: '#1abc9c',
  bosses: '#e74c3c',
  raids: '#f39c12',
  materials: '#95a5a6'
};

// Dados completos de todos os guias
const allData = {
  fruits: {
    title: '🍎 Blox Fruits',
    items: [
      { name: 'Rocket', type: 'Natural', price: '5,000 Beli', rarity: 'Comum' },
      { name: 'Spin', type: 'Natural', price: '7,500 Beli', rarity: 'Comum' },
      { name: 'Chop', type: 'Natural', price: '30,000 Beli', rarity: 'Comum' },
      { name: 'Spring', type: 'Natural', price: '60,000 Beli', rarity: 'Comum' },
      { name: 'Bomb', type: 'Natural', price: '80,000 Beli', rarity: 'Comum' },
      { name: 'Smoke', type: 'Elemental', price: '100,000 Beli', rarity: 'Comum' },
      { name: 'Spike', type: 'Natural', price: '180,000 Beli', rarity: 'Comum' },
      { name: 'Flame', type: 'Elemental', price: '250,000 Beli', rarity: 'Incomum', awakening: '14,500 Fragmentos' },
      { name: 'Eagle', type: 'Zoan', price: '300,000 Beli', rarity: 'Incomum' },
      { name: 'Ice', type: 'Elemental', price: '350,000 Beli', rarity: 'Incomum', awakening: '14,500 Fragmentos' },
      { name: 'Sand', type: 'Elemental', price: '420,000 Beli', rarity: 'Incomum', awakening: '14,500 Fragmentos' },
      { name: 'Dark', type: 'Elemental', price: '500,000 Beli', rarity: 'Incomum', awakening: '14,500 Fragmentos' },
      { name: 'Diamond', type: 'Natural', price: '600,000 Beli', rarity: 'Incomum' },
      { name: 'Light', type: 'Elemental', price: '650,000 Beli', rarity: 'Rara', awakening: '14,500 Fragmentos' },
      { name: 'Rubber', type: 'Natural', price: '750,000 Beli', rarity: 'Rara' },
      { name: 'Barrier', type: 'Natural', price: '800,000 Beli', rarity: 'Rara' },
      { name: 'Ghost', type: 'Natural', price: '940,000 Beli', rarity: 'Rara' },
      { name: 'Magma', type: 'Elemental', price: '960,000 Beli', rarity: 'Rara', awakening: '14,500 Fragmentos' },
      { name: 'Quake', type: 'Natural', price: '1,000,000 Beli', rarity: 'Lendária', awakening: '17,000 Fragmentos' },
      { name: 'Buddha', type: 'Zoan', price: '1,200,000 Beli', rarity: 'Lendária', awakening: '14,500 Fragmentos' },
      { name: 'Love', type: 'Natural', price: '1,300,000 Beli', rarity: 'Lendária' },
      { name: 'Spider', type: 'Natural', price: '1,500,000 Beli', rarity: 'Lendária', awakening: '17,300 Fragmentos' },
      { name: 'Sound', type: 'Natural', price: '1,700,000 Beli', rarity: 'Lendária' },
      { name: 'Phoenix', type: 'Zoan', price: '1,800,000 Beli', rarity: 'Lendária', awakening: '18,500 Fragmentos' },
      { name: 'Portal', type: 'Natural', price: '1,900,000 Beli', rarity: 'Lendária' },
      { name: 'Rumble', type: 'Elemental', price: '2,100,000 Beli', rarity: 'Lendária', awakening: '14,500 Fragmentos' },
      { name: 'Pain', type: 'Natural', price: '2,300,000 Beli', rarity: 'Lendária' },
      { name: 'Blizzard', type: 'Elemental', price: '2,400,000 Beli', rarity: 'Lendária' },
      { name: 'Gravity', type: 'Natural', price: '2,500,000 Beli', rarity: 'Mítica' },
      { name: 'Mammoth', type: 'Zoan', price: '2,700,000 Beli', rarity: 'Mítica' },
      { name: 'T-Rex', type: 'Zoan', price: '2,700,000 Beli', rarity: 'Mítica' },
      { name: 'Dough', type: 'Elemental', price: '2,800,000 Beli', rarity: 'Mítica', awakening: '18,500 Fragmentos' },
      { name: 'Shadow', type: 'Natural', price: '2,900,000 Beli', rarity: 'Mítica' },
      { name: 'Venom', type: 'Natural', price: '3,000,000 Beli', rarity: 'Mítica' },
      { name: 'Control', type: 'Natural', price: '3,200,000 Beli', rarity: 'Mítica' },
      { name: 'Spirit', type: 'Natural', price: '3,400,000 Beli', rarity: 'Mítica' },
      { name: 'Dragon', type: 'Zoan', price: 'Indisponível', rarity: 'Mítica' },
      { name: 'Leopard', type: 'Zoan', price: '5,000,000 Beli', rarity: 'Mítica' },
      { name: 'Kitsune', type: 'Zoan', price: '8,000,000 Beli', rarity: 'Mítica' },
      { name: 'Yeti', type: 'Zoan', price: 'Indisponível', rarity: 'Mítica' },
      { name: 'Gas', type: 'Elemental', price: 'Indisponível', rarity: 'Mítica' }
    ]
  },
  swords: {
    title: '⚔️ Espadas',
    items: [
      { name: 'Cutlass', location: 'Ilha Inicial', cost: '1,000 Beli', rarity: 'Comum' },
      { name: 'Katana', location: 'Ilha Inicial', cost: '1,000 Beli', rarity: 'Comum' },
      { name: 'Dual Katana', location: 'Vila Pirata', cost: '12,000 Beli', rarity: 'Comum' },
      { name: 'Iron Mace', location: 'Vila Pirata', cost: '25,000 Beli', rarity: 'Incomum' },
      { name: 'Triple Katana', location: 'Vila Pirata', cost: '60,000 Beli', rarity: 'Incomum' },
      { name: 'Shark Saw', location: 'Prisão', cost: 'Drop (10%)', rarity: 'Incomum' },
      { name: 'Twin Hooks', location: 'Selva', cost: 'Drop (5%)', rarity: 'Incomum' },
      { name: 'Trident', location: 'Cidade Submarina', cost: 'Drop (15%)', rarity: 'Rara' },
      { name: "Warden's Sword", location: 'Prisão', cost: 'Drop (10%)', rarity: 'Rara' },
      { name: 'Longsword', location: 'Fábrica', cost: 'Drop (10%)', rarity: 'Rara' },
      { name: 'Gravity Cane', location: 'Vila Congelada', cost: 'Drop (10%)', rarity: 'Rara' },
      { name: 'Jitte', location: 'Fortaleza Marinha', cost: 'Drop (15%)', rarity: 'Rara' },
      { name: 'Pipe', location: 'Vendedor Leste', cost: '100,000 Beli', rarity: 'Rara' },
      { name: 'Soul Cane', location: 'Navio Amaldiçoado', cost: '750,000 Beli', rarity: 'Rara' },
      { name: 'Saber', location: 'Ilha do Saber', cost: 'Quebra-cabeça', rarity: 'Lendária' },
      { name: 'Pole (1ª Forma)', location: 'Terras do Céu', cost: 'Drop (6%)', rarity: 'Lendária' },
      { name: 'Pole (2ª Forma)', location: 'Thunder God', cost: '5,000 Fragmentos', rarity: 'Lendária' },
      { name: 'Rengoku', location: 'Castelo de Gelo', cost: 'Hidden Key', rarity: 'Lendária' },
      { name: 'Koko', location: 'Reino das Rosas', cost: 'Drop (5%)', rarity: 'Lendária' },
      { name: 'Midnight Blade', location: 'Navio Amaldiçoado', cost: '100 Ectoplasmas', rarity: 'Lendária' },
      { name: 'Dragon Trident', location: 'Ilha Esquecida', cost: 'Drop (10%)', rarity: 'Rara' },
      { name: 'Dual-Headed Blade', location: 'Reino das Rosas', cost: '400,000 Beli', rarity: 'Rara' },
      { name: 'Spikey Trident', location: 'Cake Prince', cost: 'Drop (5%)', rarity: 'Lendária' },
      { name: 'Buddy Sword', location: 'Cake Queen', cost: 'Drop (5%)', rarity: 'Lendária' },
      { name: 'Dark Dagger', location: 'Indra', cost: 'Drop (2-5%)', rarity: 'Lendária' },
      { name: 'Canvander', location: 'Beautiful Pirate', cost: 'Drop (5%)', rarity: 'Lendária' },
      { name: 'Yama', location: 'Ilha Hydra', cost: 'Elite Hunter', rarity: 'Lendária' },
      { name: 'Tushita', location: 'Ilha Hydra', cost: 'Quebra-cabeça', rarity: 'Lendária' },
      { name: 'Bisento', location: 'Reino das Rosas', cost: '1,000,000 Beli', rarity: 'Lendária' },
      { name: 'Cursed Dual Katana', location: 'Ilha Hydra', cost: 'Scroll Trials', rarity: 'Mítica' },
      { name: 'Hallow Scythe', location: 'Castelo Assombrado', cost: 'Drop (5%)', rarity: 'Mítica' },
      { name: 'True Triple Katana', location: 'Reino das Rosas', cost: '2,000,000 Beli', rarity: 'Mítica' },
      { name: 'Dark Blade', location: 'Gamepass', cost: '1,200 Robux', rarity: 'Mítica' },
      { name: 'Dragonheart', location: 'Ilha Hydra', cost: 'Craft', rarity: 'Lendária' },
      { name: 'Fox Lamp', location: 'Ilha Hydra', cost: 'Santuário', rarity: 'Lendária' },
      { name: 'Shark Anchor', location: 'Ilha Hydra', cost: 'Drop', rarity: 'Lendária' }
    ]
  },
  guns: {
    title: '🔫 Armas de Fogo',
    items: [
      { name: 'Slingshot', location: 'Cidade do Meio', cost: '5,000 Beli', rarity: 'Comum' },
      { name: 'Flintlock', location: 'Cidade do Meio', cost: '10,500 Beli', rarity: 'Incomum' },
      { name: 'Musket', location: 'Cidade do Meio', cost: '8,000 Beli', rarity: 'Incomum' },
      { name: 'Refined Slingshot', location: 'Fortaleza Marinha', cost: '30,000 Beli', rarity: 'Rara' },
      { name: 'Dual Flintlock', location: 'Fortaleza Marinha', cost: '65,000 Beli', rarity: 'Rara' },
      { name: 'Cannon', location: 'Fortaleza Marinha', cost: '100,000 Beli', rarity: 'Rara' },
      { name: 'Magma Blaster', location: 'Vila do Magma', cost: 'Drop', rarity: 'Rara' },
      { name: 'Bazooka', location: 'Terras do Céu', cost: 'Drop', rarity: 'Lendária' },
      { name: 'Acidum Rifle', location: 'Fábrica', cost: 'Drop', rarity: 'Rara' },
      { name: 'Bizarre Revolver', location: 'Navio Amaldiçoado', cost: '25 Ectoplasmas', rarity: 'Rara' },
      { name: 'Kabucha', location: 'Ilha Remota', cost: '1,500 Fragmentos', rarity: 'Lendária' },
      { name: 'Venom Bow', location: 'Ilha Hydra', cost: 'Drop', rarity: 'Lendária' },
      { name: 'Dragonstorm', location: 'Ilha Hydra', cost: 'Craft', rarity: 'Lendária' },
      { name: 'Skull Guitar', location: 'Castelo Assombrado', cost: 'Craft', rarity: 'Mítica' }
    ]
  },
  fightingStyles: {
    title: '🥋 Estilos de Luta',
    items: [
      { name: 'Combat', location: 'Inicial', cost: 'Grátis', requirement: 'Nenhum' },
      { name: 'Dark Step', location: 'Vila Pirata', cost: '150,000 Beli', requirement: 'Nenhum' },
      { name: 'Electric', location: 'Terras do Céu', cost: '500,000 Beli', requirement: 'Nenhum' },
      { name: 'Water Kung Fu', location: 'Cidade Submarina', cost: '750,000 Beli', requirement: 'Nenhum' },
      { name: 'Dragon Breath', location: 'Reino das Rosas', cost: '1,500 Fragmentos', requirement: 'Nenhum' },
      { name: 'Superhuman', location: 'Montanha Nevada', cost: '3,000,000 Beli', requirement: '300 Maestria em 4 estilos' },
      { name: 'Death Step', location: 'Castelo de Gelo', cost: '2,500,000 Beli + 5,000 Fragmentos', requirement: '400 Maestria Dark Step + Library Key' },
      { name: 'Sharkman Karate', location: 'Ilha Esquecida', cost: '2,500,000 Beli + 5,000 Fragmentos', requirement: '400 Maestria Water Kung Fu + Water Key' },
      { name: 'Electric Claw', location: 'Tartaruga Flutuante', cost: '3,000,000 Beli + 5,000 Fragmentos', requirement: '400 Maestria Electric + missão' },
      { name: 'Dragon Talon', location: 'Ilha Hydra', cost: '3,000,000 Beli + 5,000 Fragmentos', requirement: '400 Maestria Dragon Breath + Fire Essence' },
      { name: 'Godhuman', location: 'Tartaruga Flutuante', cost: '5,000,000 Beli + 5,000 Fragmentos', requirement: '400 Maestria em 5 estilos + materiais' },
      { name: 'Sanguine Art', location: 'Tiki Outpost', cost: '5,000,000 Beli + 5,000 Fragmentos', requirement: 'Leviathan Heart + Demonic Wisps + Vampire Fangs + Dark Fragments' }
    ]
  },
  accessories: {
    title: '💍 Acessórios',
    items: [
      { name: 'Black Cape', location: 'Fortaleza Marinha', cost: '50,000 Beli', bonus: '+100 Energia, +100 Vida, +5% dano' },
      { name: 'Swordsman Hat', location: 'Deserto', cost: '150,000 Beli', bonus: '+10% dano de Espada' },
      { name: 'Pink Coat', location: 'Prisão', cost: 'Drop (Swan)', bonus: '+200 Vida, +10% dano de Arma' },
      { name: 'Tomoe Ring', location: 'Terras do Céu', cost: '500,000 Beli', bonus: '+10% dano de Fruta' },
      { name: 'Coat', location: 'Fortaleza Marinha', cost: 'Drop (Vice-Admiral)', bonus: '+200 Energia, +10% dano Melee' },
      { name: 'Cool Shades', location: 'Cidade Fonte', cost: 'Drop (Cyborg)', bonus: '+100 Energia, +100 Vida, +7.5% dano, +17.5% Velocidade' },
      { name: 'Black Spikey Coat', location: 'Reino das Rosas', cost: 'Drop (Jeremy)', bonus: '+200 Energia, +200 Vida, +7.5% dano' },
      { name: 'Blue Spikey Coat', location: 'Navio Amaldiçoado', cost: 'Drop (Cursed Captain)', bonus: '+500 Energia, +250 Vida, +7.5% defesa' },
      { name: 'Red Spikey Coat', location: 'Navio Amaldiçoado', cost: 'Drop (Cursed Captain)', bonus: '+250 Energia, +500 Vida, +7.5% dano' },
      { name: 'Warrior Helmet', location: 'Reino das Rosas', cost: 'Quest Bartilo', bonus: '+12.5% dano Melee/Espada, -5% cooldown' },
      { name: 'Ghoul Mask', location: 'Navio Amaldiçoado', cost: '50 Ectoplasmas', bonus: '+500 Energia, +35% Velocidade, 10% Life Steal' },
      { name: 'Choppa', location: 'Sea Beast', cost: 'Drop', bonus: '+3% dano Fruta, -15% cooldown Fruta, +10% defesa Fruta' },
      { name: 'Top Hat', location: 'Sea Beast', cost: 'Drop', bonus: '+3% dano Espada, -10% cooldown, +10% defesa Espada' },
      { name: 'Dark Coat', location: 'Darkbeard', cost: 'Drop (2%)', bonus: '+15% dano Fruta, +600 Vida, +600 Energia' },
      { name: 'Swan Glasses', location: 'Don Swan', cost: 'Drop', bonus: '+25% Velocidade, +8% dano, -8% cooldown, +8% defesa' },
      { name: 'Zebra Cap', location: 'Order', cost: 'Drop', bonus: '+10% dano Espada, -15% cooldown Fruta, +500 Energia' },
      { name: 'Pilot Helmet', location: 'Stone', cost: 'Drop', bonus: '+130% Velocidade, +10% Regeneração, +250 Vida/Energia' },
      { name: 'Valkyrie Helmet', location: 'rip_indra', cost: 'Drop', bonus: '+15% dano Espada, +600 Vida, +600 Energia' },
      { name: 'Hunter Cape', location: 'Elite Pirate', cost: 'Drop', bonus: '+10% dano, +80% Velocidade, +750 Vida' },
      { name: 'Pale Scarf', location: 'Soul Reaper', cost: 'Drop', bonus: '+15% dano Espada/Fruta, +2 Esquivas Instinct' },
      { name: 'Leviathan Shield', location: 'Leviathan', cost: 'Drop', bonus: '15% defesa, -90% dano água, +30% defesa água' }
    ]
  },
  races: {
    title: '🧬 Raças',
    items: [
      { name: 'Humano', bonus: 'Dano e mobilidade', v2: 'Flower Quest + 500,000 Beli', v3: 'Matar Diamond, Jeremy, Fajita', v4: 'Trial of Strength' },
      { name: 'Anjo', bonus: 'Regeneração e pulo', v2: 'Flower Quest + 500,000 Beli', v3: 'Matar jogador Anjo', v4: 'Trial of the King' },
      { name: 'Tubarão', bonus: 'Defesa e água', v2: 'Flower Quest + 500,000 Beli', v3: 'Matar Sea Beast', v4: 'Trial of Water' },
      { name: 'Coelho', bonus: 'Velocidade', v2: 'Flower Quest + 500,000 Beli', v3: '30 Baús', v4: 'Trial of Speed' },
      { name: 'Ghoul', bonus: 'Life Steal', v2: 'Flower Quest + 500,000 Beli', v3: 'Matar 5 jogadores', v4: 'Trial of Carnage' },
      { name: 'Cyborg', bonus: 'Defesa e energia', v2: 'Flower Quest + 500,000 Beli', v3: 'Dar fruta física', v4: 'Trial of the Machine' },
      { name: 'Draco', bonus: 'Suporte', v2: 'Flower Quest + 500,000 Beli', v3: 'Derrotar Terrorshark', v4: 'Race Awakening' }
    ]
  },
  dungeons: {
    title: '🏰 Masmorras (Dungeons)',
    items: [
      { name: 'Ancient Beast', floor: 'Andar 5', fruit: 'T-Rex', hp: '285,000', strategy: 'Duas formas, mantenha distância' },
      { name: 'Kitsune Lord', floor: 'Andar 10', fruit: 'Kitsune', hp: 'Desconhecido', strategy: 'Destrua 4 Santuários duas vezes' },
      { name: 'Gas Knight', floor: 'Andar 15', fruit: 'Gas', hp: 'Desconhecido', strategy: 'Dano extremo, derrote rápido' },
      { name: 'Zero', floor: 'Andar 20', fruit: 'Control', hp: 'Desconhecido', strategy: 'Domínio de controle, ataque após animações' }
    ],
    mechanics: 'Progressão por salas, buffs a cada sala, Observation desativado, dano base 2.800 stats'
  },
  bosses: {
    title: '👹 Chefes Especiais',
    items: [
      { name: 'rip_indra', location: 'Castelo no Mar', level: '5000', summon: '3 Auras Lendárias + God\'s Chalice', rewards: 'Valkyrie Helmet, Dark Dagger, 1,500 Fragmentos' },
      { name: 'Dough King', location: 'Cake Land', level: '2300', summon: '10 Conjured Cocoa + God\'s Chalice + 500 mortes', rewards: 'Mirror Fractal, Spikey Trident, 2,000 Fragmentos' },
      { name: 'Soul Reaper', location: 'Castelo Assombrado', level: '2100', summon: 'Hallow Essence', rewards: 'Pale Scarf, Hallow Scythe (5%)' },
      { name: 'Leviathan', location: 'Frozen Dimension', level: 'Muito alto', summon: 'Spy + 5 jogadores', rewards: 'Leviathan Shield, Leviathan Heart' }
    ]
  },
  raids: {
    title: '⚡ Raids',
    items: [
      { name: 'Flame', cost: '14,500 Fragmentos', moves: 'Z:500, X:3.000, C:4.000, V:5.000, F:2.000' },
      { name: 'Ice', cost: '14,500 Fragmentos', moves: 'Z:500, X:3.000, C:4.000, V:5.000, F:2.000' },
      { name: 'Quake', cost: '17,000 Fragmentos', moves: 'Z:1.000, X:3.000, C:5.000, V:8.000' },
      { name: 'Dark', cost: '14,500 Fragmentos', moves: 'Z:500, X:3.000, C:4.000, V:5.000, F:2.000' },
      { name: 'Light', cost: '14,500 Fragmentos', moves: 'Z:500, X:3.000, C:4.000, V:5.000, F:2.000' },
      { name: 'Spider', cost: '17,300 Fragmentos', moves: 'Z:800, X:3.500, C:4.500, V:6.000, F:2.500' },
      { name: 'Rumble', cost: '14,500 Fragmentos', moves: 'Z:500, X:3.000, C:4.000, V:5.000, F:2.000' },
      { name: 'Magma', cost: '14,500 Fragmentos', moves: 'Z:500, X:3.000, C:4.000, V:5.000, F:2.000' },
      { name: 'Buddha', cost: '14,500 Fragmentos', moves: 'Z:500, X:3.000, C:4.000, V:5.000, F:2.000' },
      { name: 'Sand', cost: '14,500 Fragmentos', moves: 'Z:500, X:3.000, C:4.000, V:5.000, F:2.000' },
      { name: 'Phoenix', cost: '18,500 Fragmentos', moves: 'M1:4.000, Z:500, X:3.000, C:4.000, V:5.000, F:2.000' },
      { name: 'Dough', cost: '18,500 Fragmentos', moves: 'M1:4.000, Z:500, X:3.000, C:4.000, V:5.000, F:2.000' }
    ]
  },
  materials: {
    title: '📦 Materiais',
    items: [
      { name: 'Bones', source: 'Castelo Assombrado, Soul Reaper', max: '5,000', uses: 'Death King, Skull Guitar' },
      { name: 'Ectoplasm', source: 'Navio Amaldiçoado, Cursed Captain', max: '1,000', uses: 'Ghoul, Skull Guitar, Midnight Blade' },
      { name: 'Fragmentos', source: 'Raids, Sea Beasts, Darkbeard, Dough King', max: 'Ilimitado', uses: 'Awakening, Godhuman, Race Reroll' },
      { name: 'Dragon Scales', source: 'Dragon Crew (Ilha Hydra)', max: 'Ilimitado', uses: 'Godhuman, Dragonstorm' },
      { name: 'Magma Ore', source: 'Vila do Magma, Hot and Cold', max: 'Ilimitado', uses: 'Godhuman, Dragon Talon' },
      { name: 'Fish Tails', source: 'Cidade Submarina, Tartaruga Flutuante', max: 'Ilimitado', uses: 'Godhuman' },
      { name: 'Demonic Wisps', source: 'Castelo Assombrado', max: 'Ilimitado', uses: 'Sanguine Art, Hallow Scythe' },
      { name: 'Dark Fragments', source: 'Darkbeard', max: 'Ilimitado', uses: 'Sanguine Art, Skull Guitar' },
      { name: 'Mirror Fractal', source: 'Dough King', max: 'Ilimitado', uses: 'Race V4' }
    ]
  }
};

// Categorias para exibição
const categories = [
  { id: 'fruits', label: '🍎 Frutas' },
  { id: 'swords', label: '⚔️ Espadas' },
  { id: 'guns', label: '🔫 Armas' },
  { id: 'fightingStyles', label: '🥋 Estilos de Luta' },
  { id: 'accessories', label: '💍 Acessórios' },
  { id: 'races', label: '🧬 Raças' },
  { id: 'dungeons', label: '🏰 Masmorras' },
  { id: 'bosses', label: '👹 Chefes' },
  { id: 'raids', label: '⚡ Raids' },
  { id: 'materials', label: '📦 Materiais' }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('fruits');
  const [failedImages, setFailedImages] = useState({});

  const getCategoryData = (id) => allData[id] || { title: '', items: [] };

  const filterItems = (items) => {
    if (!searchTerm.trim()) return items;
    return items.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const getRarityClass = (rarity) => {
    const map = {
      'Comum': styles.rarityCommon,
      'Incomum': styles.rarityUncommon,
      'Rara': styles.rarityRare,
      'Lendária': styles.rarityLegendary,
      'Mítica': styles.rarityMythical
    };
    return map[rarity] || '';
  };

  const handleImageError = (name, category) => {
    setFailedImages(prev => ({
      ...prev,
      [`${category}-${name}`]: true
    }));
  };

  const renderItems = (items) => {
    const filtered = filterItems(items);
    if (filtered.length === 0) {
      return <p className={styles.emptyMessage}>Nenhum resultado encontrado.</p>;
    }
    return filtered.map((item, idx) => {
      const title = item.name || 'Item';
      const rarity = item.rarity || '';
      const imageKey = `${activeCategory}-${title}`;
      const imageFailed = failedImages[imageKey];
      
      // Se a imagem falhou, usa o SVG fallback
      const imageUrl = imageFailed 
        ? generateFallbackSvg(title, activeCategory)
        : getImageUrl(title, activeCategory);

      return (
        <div key={idx} className={`${styles.itemCard} ${getRarityClass(rarity)}`}>
          <div className={styles.itemImageWrapper}>
            <img 
              src={imageUrl}
              alt={title}
              className={styles.itemImage}
              onError={() => handleImageError(title, activeCategory)}
            />
            {rarity && (
              <span className={`${styles.rarityBadge} ${getRarityClass(rarity)}`}>
                {rarity}
              </span>
            )}
          </div>
          <div className={styles.itemDetails}>
            {Object.entries(item).map(([key, value]) => {
              if (key === 'image' || key === 'rarity') return null;
              const label = key.charAt(0).toUpperCase() + key.slice(1);
              return (
                <div key={key} className={styles.itemRow}>
                  <span className={styles.itemLabel}>{label}:</span>
                  <span className={styles.itemValue}>{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  const activeData = getCategoryData(activeCategory);
  const categoryColor = categoryColors[activeCategory] || '#f7c948';

  return (
    <div className={styles.container}>
      <Head>
        <title>Blox Fruits · Guia Definitivo</title>
        <meta name="description" content="Guia completo de Blox Fruits com todas as frutas, armas, acessórios, raças e muito mais" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🍍%3C/text%3E%3C/svg%3E" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>🍍 Blox Fruits Guide</h1>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar item..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className={styles.clearButton}
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
      </header>

      <nav className={styles.nav}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.navButton} ${activeCategory === cat.id ? styles.navButtonActive : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              borderColor: activeCategory === cat.id ? categoryColors[cat.id] : 'transparent'
            }}
          >
            <span className={styles.navIcon}>{cat.label.split(' ')[0]}</span>
            <span className={styles.navLabel}>{cat.label.split(' ').slice(1).join(' ') || cat.label}</span>
          </button>
        ))}
      </nav>

      <section className={styles.content}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} style={{ borderColor: categoryColor }}>
            {activeData.title}
          </h2>
          <span className={styles.itemCount}>{activeData.items.length} itens</span>
        </div>
        <div className={styles.grid}>
          {renderItems(activeData.items)}
        </div>
        {activeData.mechanics && (
          <div className={styles.mechanicsBox} style={{ borderColor: categoryColor }}>
            <strong>⚙️ Mecânicas:</strong> {activeData.mechanics}
          </div>
        )}
      </section>
    </div>
  );
}