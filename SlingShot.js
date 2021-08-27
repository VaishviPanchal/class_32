class SlingShot{
    constructor(body,point) {
        var options={
            bodyA : body,
            pointB : point,
            length : 10,
            stiffness : 0.05
        }
        this.chain=Constraint.create(options)
        World.add(world,this.chain)
        this.image1 = loadImage("sprites/sling1.png")
        this.image2 = loadImage("sprites/sling2.png")
        this.image3 = loadImage("sprites/sling3.png")
    }

    display(){
        image(this.image1,200,20)
        image(this.image2,170,20)
        if (this.chain.bodyA){
            var pointA = this.chain.bodyA.position;
            var pointB = this.chain.pointB;
            
            push()
            stroke(49,22,8)
            strokeWeight(4)
            if(pointA.x<230){
                line(pointA.x-20,pointA.y,pointB.x+30,pointB.y)
                line(pointA.x-20,pointA.y,pointB.x-30,pointB.y)
                image(this.image3,pointA.x-30,pointA.y-15,15,30)
            }
            else{
                line(pointA.x+20,pointA.y,pointB.x-30,pointB.y)
                line(pointA.x+20,pointA.y,pointB.x+30,pointB.y)
                image(this.image3,pointA.x+20,pointA.y-15,15,30)
            }
            pop()
        }
        //console.log(this.chain.pointB)
    }
    fly(){
        this.chain.bodyA=null;
    }
    attach(body){
        this.chain.bodyA=body
    }
}
