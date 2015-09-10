$(document).ready(function(){
    var x = 0;
    var frameCount =192000.0;
    var duration = .02;
    var frameLength = frameCount*duration;
    var audio = new window.AudioContext();
    setInterval(function () {
        var buffer = audio.createBuffer(2,frameCount*duration,192000 );
        
        
       
        var nowBuffering = buffer.getChannelData(1);
        var nowBuffering2 = buffer.getChannelData(0);
        var offsetX=0;
        var offsetY=0;
        if(x%240 < 60) {
            offsetX=(x%60/60.0);
            offsetY=0;
        } else if (x%240 < 120) {
            offsetX=1;
            offsetY=(x%60/60.0);
        }else if (x%240 < 180) {
            offsetX=1-(x%60/60.0);
            offsetY=1;
        }else if (x%240 < 240) {
            offsetX=0;
            offsetY=1-(x%60/60.0);
        }

        var j = 0.0;

        for ( var i = 0; i < frameLength/4; i++) {
            nowBuffering[i+Math.floor(j*frameLength/4)] = 0 -(offsetX);
            nowBuffering2[i+Math.floor(j*frameLength/4)] = i/( frameLength/4)-(offsetY);      
        }

        j=1;

        for (var i = 0; i < frameLength/4; i++) {
               
            nowBuffering[i+Math.floor(j*frameLength/4)] = i/( frameLength/4)-(offsetX)
            nowBuffering2[i+Math.floor(j*frameLength/4)] = 1-(offsetY);
        }
        j=2;
        for (var i = 0; i < frameLength/4; i++) {
    
            nowBuffering[i+Math.floor(j*frameLength/4)] = 1-(offsetX)
            nowBuffering2[i+Math.floor(j*frameLength/4)] = 1-i/( frameLength/4)-(offsetY);
        }
        j=3;
        for (var i = 0; i < frameLength/4; i++) {
       
            nowBuffering[i+Math.floor(j*frameLength/4)] = 1-i/( frameLength/4)-(offsetX);
            nowBuffering2[i+Math.floor(j*frameLength/4)] = 0-(offsetY);           
        }
    

        var source2 = audio.createBufferSource();
        source2.buffer = buffer;
        source2.connect(audio.destination);
        //source2.loop=true;
        source2.start(audio.currentTime);
        x++;

     },20);
   
})