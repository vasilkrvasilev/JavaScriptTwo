(function () {
    // Create white field
    var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw the house
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 200, 180);
    ctx.strokeRect(100, 100, 200, 180);

    // Draw the windows
    ctx.fillStyle = 'black';
    ctx.fillRect(110, 120, 80, 60);
    ctx.fillRect(210, 120, 80, 60);
    ctx.fillRect(210, 200, 80, 60);
    ctx.strokeStyle = 'red';

    // Divide the windows
    ctx.moveTo(110, 150);
    ctx.lineTo(190, 150);
    ctx.moveTo(210, 150);
    ctx.lineTo(290, 150);
    ctx.moveTo(210, 230);
    ctx.lineTo(290, 230);

    ctx.moveTo(150, 120);
    ctx.lineTo(150, 180);
    ctx.moveTo(250, 120);
    ctx.lineTo(250, 180);
    ctx.moveTo(250, 200);
    ctx.lineTo(250, 260);
    ctx.stroke();

    // Draw the roof
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.lineTo(200, 30);
    ctx.lineTo(100, 100);
    ctx.fill();
    ctx.stroke();

    //Draw the chimney
    ctx.beginPath();
    ctx.moveTo(240, 80);
    ctx.lineTo(240, 50);
    ctx.lineTo(260, 50);
    ctx.lineTo(260, 80);
    ctx.fill();
    ctx.stroke();

    // Draw the door
    ctx.beginPath();
    ctx.moveTo(120, 280);
    ctx.lineTo(120, 220);
    ctx.moveTo(150, 280);
    ctx.lineTo(150, 200);
    ctx.moveTo(180, 280);
    ctx.lineTo(180, 220);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(140, 260, 3, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(160, 260, 3, 0, 2 * Math.PI, false);
    ctx.stroke();

    // Drow the ellipses
    ctx.scale(1, 0.6);
    ctx.beginPath();
    ctx.arc(150, 365, 30, Math.PI, 2 * Math.PI, false);
    ctx.stroke();

    ctx.scale(1, 0.5);
    ctx.beginPath();
    ctx.arc(250, 160, 10, 25, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();
}());