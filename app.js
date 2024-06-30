
function capture(e='webm') {
  const options = {
    'webm': {'type' : "video/webm",'mineType': 'video/webm; codecs=vp9'},
    'mp4': {'type' : "video/mp4",'mineType': 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'}
  };
  const video = document.querySelector("video");
  if (video) {
    video.currentTime = 0;
    video.play();
    setTimeout(() => {
      const stream = video.captureStream();
      const option = { mimeType: options[e].mineType };
      const recorder = new MediaRecorder(stream, option);
      const chunks = [];
      recorder.ondataavailable = event => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      recorder.onstop = () => {
        const option = {type: options[e].type}
        const blob = new Blob(chunks, { type: option });
        const objectURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = objectURL;
        a.download = `video.${e}`; 
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(objectURL);
      };
      recorder.start();
      const end = video.duration * 1000 || 5000;
      setTimeout(() => {
        recorder.stop();
        video.pause();
      }, end);
    }, 100);
  } else return false;
};

var d = document, cs = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:114514;padding:10px;';
var m = (t='div') => { return d.createElement(t) };
var ap = (e) => { return d.body.appendChild(e) };
var div = m(),form = m('form'),sele = m('select');
sele.style.cssText = cs;
var ao = (e, v, tx, script=null) => {
  var op = m('option');
  op.value = v; op.textContent = tx;
  e.appendChild(op);
  if (script) e.addEventListener('change', (event) => { if (event.target.value === v) script(); });
};
ao(sele, 'MP4', 'mp4', () => { alert('mp4'); capture('mp4');});
ao(sele, 'WEBM', 'webm', () => { alert('webm'); capture('webm');});
form.appendChild(sele);
div.appendChild(form);
ap(div);
