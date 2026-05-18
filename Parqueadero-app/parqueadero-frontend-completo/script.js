
let vehicles = [];

function login(){
  const user=document.getElementById('user').value;
  const pass=document.getElementById('pass').value;

  if(user==="admin" && pass==="1234"){
    window.location.href="index.html";
  }else{
    alert("Credenciales incorrectas");
  }
}

function logout(){
  window.location.href="login.html";
}

function showSection(id){
  const sections=document.querySelectorAll('.section');
  sections.forEach(sec=>sec.style.display="none");
  document.getElementById(id).style.display="block";
}

function addVehicle(){
  const plate=document.getElementById('plate').value;
  const owner=document.getElementById('owner').value;
  const type=document.getElementById('type').value;

  if(plate===""||owner===""){
    alert("Complete todos los campos");
    return;
  }

  vehicles.push({plate,owner,type});
  renderTable();
  document.getElementById('plate').value="";
  document.getElementById('owner').value="";
}

function renderTable(){
  const table=document.getElementById('vehicleTable');
  table.innerHTML="";
  vehicles.forEach(v=>{
    table.innerHTML+=`
      <tr>
        <td>${v.plate}</td>
        <td>${v.owner}</td>
        <td>${v.type}</td>
      </tr>`;
  });
}
