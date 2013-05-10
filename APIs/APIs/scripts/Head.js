(function () {
    // Create white field
    var ctx = document.getElementsByTagName('canvas')[1].getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw the head
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.fillStyle = '#99f';
    ctx.arc(150, 250, 50, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    // Draw the nose
    ctx.moveTo(140, 230);
    ctx.lineTo(130, 250);
    ctx.lineTo(140, 250);
    ctx.stroke();

    // Draw the mouth
    ctx.scale(1, 0.5);
    ctx.beginPath();
    ctx.arc(140, 540, 20, 0, 2 * Math.PI, false);
    ctx.stroke();

    // Draw the eyes
    ctx.beginPath();
    ctx.arc(120, 460, 10, 0, 2 * Math.PI, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(160, 460, 10, 0, 2 * Math.PI, false);
    ctx.stroke();

    // Draw the head
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'blue';
    ctx.scale(1, 0.5);
    ctx.beginPath();
    ctx.arc(150, 800, 50, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(150, 800, 20, 0, Math.PI, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(130, 800);
    ctx.lineTo(130, 600);
    ctx.lineTo(170, 600);
    ctx.lineTo(170, 800);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(150, 600, 20, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    // Draw the eyes in
    ctx.scale(1, 8);

    ctx.beginPath();
    ctx.arc(115, 115, 2, 0, 2 * Math.PI, false);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(155, 115, 2, 0, 2 * Math.PI, false);
    ctx.fill();
}());