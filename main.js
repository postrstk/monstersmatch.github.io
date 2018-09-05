    console.log("HELLO!");
    var config = {
        width: 800,
        height: 800,
        type: Phaser.AUTO,
        parent: 'phaser-example',
        scene: {
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);
    var polygon;
    var graphics;
    var timedEvent;
    var side = 1;
    var incx = 15;
    var incy = 40;
    function preload() {console.log("HELLO!");}
    function create() 
    {
        polygon = new Phaser.Geom.Polygon([
            2.7*incx, incy,
            3*incx, 2*incy,
            4*incx, 3*incy,
            3.5*incx, 4*incy,
            4.2*incx, 5*incy,
            3.8*incx, 6*incy,
            5*incx, 7*incy,
            5.5*incx, 8*incy,
            6*incx, 7*incy,
            6.3*incx, 6*incy,
            6.1*incx, 5*incy,
            7.2*incx, 4*incy,
            8*incx, 3*incy,
            7.9*incx, 2*incy,
            7.5*incx, incy,
        ]);
        graphics = this.add.graphics({ x: 0, y: 0 });

        graphics.lineStyle(2, 0x00aaaa);

        graphics.beginPath();

        graphics.moveTo(polygon.points[0].x, polygon.points[0].y);

        for (var i = 1; i < polygon.points.length; i++)
        {
            graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
        }

        graphics.closePath();
        graphics.strokePath();

        timedEvent = this.time.addEvent({ delay: 100, callback: onEvent, callbackScope: this, repeat: 0 });

        this.input.on('pointerdown', function () {

            /*if (timedEvent.paused)
            {
                timedEvent.paused = false;
            }
            else
            {
                timedEvent.paused = true;
            }*/
						side *= -1;
        });
    }
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    function update() 
    {
        if ( game.input.mousePointer.x >= polygon.points[7].x)
            side = 1;
        else 
            side = -1;
        //console.log(timedEvent.repeat);
    }

    function onEvent()
    {
        //graphics.destroy();
        graphics.clear();
        graphics = this.add.graphics({ x: 0, y: 0 });
        
        
        polygon.points[0].x = polygon.points[1].x;
        polygon.points[14].x = polygon.points[13].x;

        polygon.points[1].x = polygon.points[2].x - getRandomArbitrary(0, 0.2) * incx;
        polygon.points[13].x = polygon.points[12].x + getRandomArbitrary(0, 0.2) * incx;

        polygon.points[2].x = polygon.points[3].x - getRandomArbitrary(0, 0.4) * incx;
        polygon.points[12].x = polygon.points[11].x + getRandomArbitrary(0, 0.4) * incx;

        polygon.points[3].x = polygon.points[4].x - getRandomArbitrary(0, 0.5) * incx;
        polygon.points[11].x = polygon.points[10].x + getRandomArbitrary(0, 0.5) * incx;

        polygon.points[4].x = polygon.points[5].x - getRandomArbitrary(0, 0.6) * incx;
        polygon.points[10].x = polygon.points[9].x + getRandomArbitrary(0, 0.6) * incx;

        polygon.points[5].x = polygon.points[6].x - getRandomArbitrary(0.5, 0.8) * incx;
        polygon.points[9].x = polygon.points[8].x + getRandomArbitrary(0.5, 0.8) * incx;

        polygon.points[6].x = polygon.points[7].x-getRandomArbitrary(0.5, 1) * incx;
        polygon.points[8].x = polygon.points[7].x+getRandomArbitrary(0.5, 1) * incx;

        polygon.points[7].x += side * getRandomArbitrary(0.5, 1) * incx;
        
        graphics.beginPath();
        graphics.moveTo(polygon.points[0].x, polygon.points[0].y);

        for (var i = 1; i < polygon.points.length; i++)
        {
            graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
        }
        graphics.fillStyle(0x81ffa7, 1);
        graphics.closePath();
        graphics.fillPath();

        graphics.lineStyle(3, 0x445626);

        graphics.beginPath();
        graphics.moveTo(polygon.points[0].x, polygon.points[0].y);

        for (var i = 1; i < polygon.points.length; i++)
        {
            graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
        }
        graphics.closePath();
        graphics.strokePath();
        
        for (var i = 1; i < 7; i++)
        {
        	  var point_1 = {x:0, y:0};
            var point_2 = {x:0, y:0};
            var cent_x_1 ;
            var cent_y_1 ;

            var cent_x_2 ;
            var cent_y_2 ;
            if (i == 1)
            {
                cent_x_1 = (polygon.points[i].x + 
                        polygon.points[polygon.points.length - i -1].x)/2;
                cent_y_1 = polygon.points[i].y - 1 * incy;

                cent_x_2 = (polygon.points[0].x + 
                        polygon.points[polygon.points.length - i].x)/2;
                cent_y_2 = polygon.points[0].y;

                var line = new Phaser.Geom.Line(cent_x_1, cent_y_1, 
                    cent_x_2, cent_y_2);
                //graphics.strokeLineShape(line); 

	            if(cent_x_1 > cent_x_2)
	            {
	                point_1.x = polygon.points[0].x;
	                point_1.y = polygon.points[0].y;

	                point_2.x = polygon.points[i].x;
	                point_2.y = polygon.points[i].y;
	            }
	            else
	            {
	                point_1.x = polygon.points[polygon.points.length - i ].x;
	                point_1.y = polygon.points[polygon.points.length - i ].y;

	                point_2.x = polygon.points[polygon.points.length - i -1].x;
	                point_2.y = polygon.points[polygon.points.length - i -1].y;
	            }

			        graphics.beginPath();
			        graphics.moveTo(point_1.x, point_1.y);

	            graphics.lineTo(point_1.x, point_1.y);
	            graphics.lineTo(point_2.x, point_2.y);
	            graphics.lineTo(cent_x_2, cent_y_2);

			        graphics.fillStyle(0x39a24e, 1);
			        graphics.closePath();
			        graphics.fillPath();               
            }
            if(i != 6)
            {
                cent_x_1 = (polygon.points[i].x + 
                        polygon.points[polygon.points.length - i -1].x)/2;
                cent_y_1 = polygon.points[i].y - 1 * incy;

                cent_x_2 = (polygon.points[i+1].x + 
                        polygon.points[polygon.points.length - i -2].x)/2;
                cent_y_2 = polygon.points[i+1].y - 1 * incy;                
            }
            else 
            {
                cent_x_1 = (polygon.points[i].x + 
                        polygon.points[polygon.points.length - i -1].x)/2;
                cent_y_1 = polygon.points[i].y - 1 * incy;

                cent_x_2 = polygon.points[7].x;
                cent_y_2 = polygon.points[7].y;                
            }
            

            if(cent_x_1 < cent_x_2)
            {
                point_1.x = polygon.points[polygon.points.length - i -1].x;
                point_1.y = polygon.points[polygon.points.length - i -1].y;

                point_2.x = polygon.points[polygon.points.length - i -2].x;
                point_2.y = polygon.points[polygon.points.length - i -2].y;
            }
            else
            {
                point_1.x = polygon.points[i].x;
                point_1.y = polygon.points[i].y;

                point_2.x = polygon.points[i+1].x;
                point_2.y = polygon.points[i+1].y;
            }

		        graphics.beginPath();
		        graphics.moveTo(point_1.x, point_1.y);

            graphics.lineTo(point_1.x, point_1.y);
            graphics.lineTo(point_2.x, point_2.y);
            graphics.lineTo(cent_x_2, cent_y_2);
            graphics.lineTo(cent_x_1, cent_y_1);

		        graphics.fillStyle(0x39a24e, 1);
		        graphics.closePath();
		        graphics.fillPath();

	          var line = new Phaser.Geom.Line(cent_x_1, cent_y_1, 
                cent_x_2, cent_y_2);
            graphics.strokeLineShape(line);
            line = new Phaser.Geom.Line(cent_x_1, cent_y_1, 
                polygon.points[i].x, polygon.points[i].y);
            //graphics.strokeLineShape(line);
            
            line = new Phaser.Geom.Line(cent_x_1, cent_y_1, 
                polygon.points[polygon.points.length - i -1].x, 
                polygon.points[polygon.points.length - i -1].y);
            //graphics.strokeLineShape(line);

        }

timedEvent = this.time.addEvent({ delay: 100, callback: onEvent, callbackScope: this, repeat: 0 });
    }