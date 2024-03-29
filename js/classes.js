// criando Objetos
class Sprite {
    constructor({
        position,
        imgSrc,
        scale = 1,
        framesMax = 1,
        offset = {x:0, y:0}
    }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image()
        this.image.src = imgSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    };

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    };

    animateFrame() {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            };
        };
    };
    
    update() {
        this.draw()
        this.animateFrame()

    };
};

// extends é usado pra pegar propriedades de outra classe, no caso aqui a classe Sprite
class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        color = 'red',
        imgSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined}
    }) {
        // super é a palavra chave que acessa os objetos da classe pai
        // dentro do super ficam as propriedades erdadas da classe pai
        super({
            position,
            imgSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity;
        this.width = 50
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color,
        this.isAttacking,
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5,
        this.sprites = sprites
        this.dead = false

        for(const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imgSrc
        };
    };


    update() {
        this.draw()
        if(!this.dead) {this.animateFrame()}

        //Cria a caixa responsavel pela interação dos ataques
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        
         //Desenha a caixa na tela
        //c.fillRect(
            //this.attackBox.position.x, 
            //this.attackBox.position.y, 
            //this.attackBox.width, 
          //this.attackBox.height
        //)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // algoritmo da gravidade
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 30) {
            this.velocity.y = 0
            //posição exata do chao
            this.position.y = 250
        } else this.velocity.y += gravity;
    };

    // função que ativa o sprite de ataque e adiciona o valor true a colisao
    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
    };

    takeHit() {
        this.health -= 20

        if(this.health <=0) {
            this.switchSprite('death')
        }else this.switchSprite('takeHit')
    };

    switchSprite (sprite) {
        // Essa animação sobrepoe em caso de morte
        if(this.image === this.sprites.death.image) {
            if(this.framesCurrent === this.sprites.death.framesMax -1)
            this.dead = true
            return
        }

        // essa animação sobrepoe todas as outras animações com a animação de atacar
        if (
            this.image === this.sprites.attack1.image &&
            this.framesCurrent < this.sprites.attack1.framesMax - 1
        )
            return
        // essa animação sobrepoe quando for atingido
        if (
            this.image === this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1
        )
            return
        
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                };
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                };
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                };
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                };
                break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                };
                break
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                };
                break
                case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                };
                    break
        
        };
        
    };
};