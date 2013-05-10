(function () {
    // Create white field
    var ctx = document.getElementsByTagName('canvas')[2].getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw the weels
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.fillStyle = '#99f';

    ctx.beginPath();
    ctx.arc(150, 150, 50, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(330, 150, 50, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    // Draw the bicycle
    ctx.moveTo(150, 150);
    ctx.lineTo(220, 150);
    ctx.lineTo(330, 90);
    ctx.lineTo(200, 90);
    ctx.lineTo(150, 150);
    ctx.stroke();

    ctx.moveTo(220, 150);
    ctx.lineTo(190, 80);
    ctx.moveTo(180, 80);
    ctx.lineTo(200, 80);
    ctx.stroke();

    ctx.moveTo(330, 150);
    ctx.lineTo(330, 70);
    ctx.lineTo(310, 70);
    ctx.moveTo(330, 70);
    ctx.lineTo(340, 60);
    ctx.stroke();

    // Draw the pedals
    ctx.beginPath();
    ctx.arc(220, 150, 10, 0, 2 * Math.PI, false);
    ctx.stroke();

    ctx.moveTo(215, 143);
    ctx.lineTo(207, 135);
    ctx.moveTo(225, 157);
    ctx.lineTo(233, 165);
    ctx.stroke();
}());