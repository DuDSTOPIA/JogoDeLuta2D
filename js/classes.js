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
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    };

    draw() {
        c.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.framesMax),
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
            if (this.frameCurrent < this.framesMax - 1) {
                this.frameCurrent++
            } else {
                this.frameCurrent = 0
            }
        }

    }

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
        sprites
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
            offset,
            width: 100,
            height: 50
        }
        this.color = color,
        this.isAttacking,
        this.health = 100
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5,
        this.sprites = sprites

        for(const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imgSrc
        }
    };


    update() {
        this.draw()
        this.animateFrame()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // algoritmo da gravidade
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
            //posição exata do chao
            this.position.y = 330
        } else this.velocity.y += gravity;
    };

    // cria o ataque por 100 milesegundos e desativa
    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }

    switchSprite (sprite) {
        if( this.image === this.sprites.attack1.image && this.frameCurrent < this.sprites.attack1.framesMax -1) return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image)
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                break;
            case 'run':
                if (this.image !== this.sprites.run.image)
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image)
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image)
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                break;
            case 'attack1':
                if (this.image !== this.sprites.attack1.image)
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                break;
        
        }
        
    }
};