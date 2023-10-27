const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Tamagotchi {
  constructor(name) {
    this.name = name;
    this.happiness = 100;
    this.hunger = 0;
  }

  feed() {
    console.log(`${this.name} foi alimentado! 🍔`);
    this.hunger -= 20;
    this.happiness += 10;
  }

  pet() {
    console.log(`${this.name} recebeu carinho! ❤️`);
    this.happiness += 20;
  }

  play() {
    console.log(`${this.name} foi passear! 🚶`);
    this.happiness += 30;
  }

  changeEmoji(emoji) {
    console.log(`${this.name} mudou para um novo emoji: ${emoji}!`);
  }

  updateStatus() {
    this.hunger += 10;
    this.happiness -= 10;
    if (this.hunger >= 100 || this.happiness <= 0) {
      console.log(`${this.name} morreu de fome ou tristeza! 😢`);
      process.exit(0);
    }
  }
}

function displayMenu(tamagotchi) {
  console.log("====================");
  console.log(`Nome: ${tamagotchi.name}`);
  console.log(`Felicidade: ${tamagotchi.happiness}`);
  console.log(`Fome: ${tamagotchi.hunger}`);
  console.log("====================");
  console.log("Escolha uma ação:");
  console.log("1. Alimentar");
  console.log("2. Dar carinho");
  console.log("3. Passear");
  console.log("4. Trocar emoji");
  console.log("5. Sair");
}

async function main() {
  console.log("Bem-vindo ao Tamagotchi! Crie seu bichinho virtual.");
  rl.question("Dê um nome ao seu Tamagotchi: ", (name) => {
    const tamagotchi = new Tamagotchi(name);

    setInterval(() => {
      tamagotchi.updateStatus();
    }, 20000);

    displayMenu(tamagotchi);

    rl.on("line", (input) => {
      switch (input) {
        case "1":
          tamagotchi.feed();
          break;
        case "2":
          tamagotchi.pet();
          break;
        case "3":
          tamagotchi.play();
          break;
        case "4":
          rl.question("Digite o novo emoji: ", (emoji) => {
            tamagotchi.changeEmoji(emoji);
            displayMenu(tamagotchi);
          });
          break;
        case "5":
          console.log("Até mais!");
          rl.close();
          process.exit(0);
          break;
        default:
          console.log("Opção inválida, tente novamente.");
      }
      displayMenu(tamagotchi);
    });
  });
}

main();