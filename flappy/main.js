		var
			
			canvas,
			ctx,
			width,
			height,
			
			fgpos = 0,
			frames = 0,
			score = 0,
			best =0,
		
			currentstate,
			states = {
				Spash:0, Game:1, Score:2	
			}
			
			bird = {
				x:60,
				y:100,
				frame: 0,
				velocity: 0,
				animation: [0, 1, 2 , 1],
				rotation: 0,
				gravity: 0.25,
				_jump: 4.6,
				
				jump: function(){
					this.velocity = -this._jump;
				},
				
				update: function(){
					var n = currentstate === states.Spash ? 10 : 5;
					this.frame += frames % n === 0 ? 1 : 0;
					this.frame %= this.animation.length;
					
					if(currentstate === states.Spash){
						this.y = height - 280 + 5*Math.cos(frames/10);
						this.rotation = 0;						
					}
					
					else {
                        this.velocity += this.gravity;
                        this.y += this.velocity;

                        if (this.y >= height - s_fg.height - 10) {
                            this.y = height - s_fg.height - 10;
                            if (currentstate === states.Game) {
                                currentstate = states.Score;
                            }
                            this.velocity = this._jump;
                        }
						if(this.velocity >= this._jump){
                            this.frame = 1;
                            this.rotation = Math.min(Math.PI/2, this.rotation + 0.3);
                        }
                        else{
                            this.rotation = -0.3;
                        }
						
					}
				},
				
				draw: function(ctx){
					ctx.save();
					ctx.translate(this.x, this.y);
					ctx.rotate(this.rotation);
					
					var n = this.animation[this.frame];
					s_bird[n].draw(ctx, -s_bird[n].width/2, -s_bird[n].height/2)
					ctx.restore();
				}
			},
			
			pipes = {

                _pipes:[],

                reset: function(){
                    this._pipes = [];
                },

				update: function(){
                    if(frames % 100 ===0){
                        var _y = height - (s_pipeSouth.height + s_fg.height + 120 + 200*Math.random());
                        this._pipes.push({
                            x: 500,
                            y: _y,
                            width: s_pipeSouth.width,
                            height: s_pipeSouth.height
                        });
                    }
                    for(var i = 0, len = this._pipes.length; i < len; i++){
                        var p = this._pipes[i];
                        p.x -= 2;
                        if(p.x < -50){
                            this._pipes.splice(i, 1);
                            i--;
                            len--;
                        }
                    }
                },

				draw: function(ctx){

                    for(var i = 0, len = this._pipes.length; i < len; i++){
                        var p = this._pipes[i];
                        s_pipeSouth.draw(ctx, p.x, p.y);
                        s_pipeNorth.draw(ctx, p.x, p.y + 80 + p.height);
                    }
				}
		
			};
			
			function onpress(evt){
				console.log(currentstate);
				switch (currentstate){
					case 0: // case Splash
						currentstate = states.Game;
						bird.jump();
						break;						
					case 1: //case Game
						bird.jump();
						break;						
					case 2: //case Score
						break;
					default:
						console.log("default");
				}
			}
		
			function main(){
				canvas = document.createElement("canvas");
				
				width = window.innerWidth;
				height = window.innerHeight;
				
				var evt = "touchstart";
				if(width >= 500){
					width = 320;
					height = 480;
					canvas.style.border = "1px solid blue";
					evt = "mousedown";
					
				}
				
				document.addEventListener(evt, onpress);
									
				canvas.width = width;
				canvas.height = height;
				ctx = canvas.getContext("2d");
				
				currentstate = states.Spash;
				
				document.body.appendChild(canvas);
				
				var img = new Image();
				img.onload = function(){
					initSprites(this);
					ctx.fillStyle = s_bg.color;
					run();
				}
				img.src = "res/sheet.png";
			}
			
			function run(){
				var loop = function(){
					update();
					render();
					window.requestAnimationFrame(loop, canvas);
				}
				window.requestAnimationFrame(loop, canvas);
			}
			
			function update(){
				frames++;
                if(currentstate !== states.Score){
                    fgpos = (fgpos - 2) % 14;
                }
                if(currentstate === states.Game){
                    pipes.update();
                }
				bird.update();
			}
			
			function render(){
				ctx.fillRect(0,0, width, height);
				
				s_bg.draw(ctx, 0, height - s_bg.height);
				s_bg.draw(ctx, s_bg.width, height - s_bg.height);
				
				bird.draw(ctx);
				pipes.draw(ctx);
				
				s_fg.draw(ctx, fgpos, height - s_fg.height);
				s_fg.draw(ctx, fgpos + s_fg.width, height - s_fg.height);
				
				var width2 = width/2;
				
				if(currentstate === states.Spash){
					s_splash.draw(ctx, width2 - s_splash.width/2, height - 300);
					s_text.GetReady.draw(ctx, width2 - s_text.GetReady.width/2,
													   height - 380);
				}
				
			}
			
			main();