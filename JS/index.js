let arrayTareas=[];
let ultimo = 0;

let AgregarTarea=(titulo, descripcion)=> {
    let tarea={
        id: ultimo,
        titulo:titulo,
        descripcion: descripcion,
        status:false,
        time: new Date(),
        terminado: 0
    }
    console.log(tarea.time)
    arrayTareas.push(tarea);
    let ul=document.getElementById("tareas");
        ul.innerHTML+=`<div class="ok">
        <li><input type="checkbox" id="${ultimo}" onclick=Marcar(id)><h10> ${titulo} </h10><i class="fa-solid fa-eye fa-2xs" data-toggle="modal" data-target="#texto" onclick=Modal(${ultimo});></i> 
            <i class="fa-solid fa-trash-can" onclick="borrarTarea(${ultimo})"></i></input></li>
            </div>
        </div>`
    ultimo++;
    document.getElementById("tituloTarea").value=""
    document.getElementById("descripcionTarea").value=""
}

let Marcar=(Id)=>{
    let pos;
    for(i=0; i<arrayTareas.length;i++){
        let Ver = arrayTareas[i].id
        if(Id==Ver){
            pos= i
        }
    }
    console.log(pos)
    arrayTareas[pos].status=true;
    arrayTareas[pos].terminado=new Date()-arrayTareas[pos].time;
    Refrescar();
}

let Refrescar=()=>{
    let ul=document.getElementById("tareas")
    document.getElementById("tareas").innerHTML = "";
    for(let i = 0; i<arrayTareas.length; i++){
        if(arrayTareas[i].status){
            ul.innerHTML+=`<div class="lista">
            <li><input type="checkbox" id="${arrayTareas[i].id}" checked disabled="disabled" onclick=Marcar(id) ><h10> ${arrayTareas[i].titulo} </h10><i class="fa-solid fa-eye fa-2xs" data-toggle="modal" data-target="#texto" onclick=Modal(${arrayTareas[i].id});></i> 
            <i class="fa-solid fa-trash-can" onclick="borrarTarea(${arrayTareas[i].id})"></i></input></li>
            </div>
            </div>`
        }else{
            ul.innerHTML+=`<div class="ok">
            <li><input type="checkbox" id="${arrayTareas[i].id}" onclick=Marcar(id)><h10> ${arrayTareas[i].titulo} </h10><i class="fa-solid fa-eye fa-2xs" data-toggle="modal" data-target="#texto" onclick=Modal(${arrayTareas[i].id});></i> 
            <i class="fa-solid fa-trash-can" onclick="borrarTarea(${arrayTareas[i].id})"></i></input></li>
            </div>`
        }
    }
}

let Modal=(id)=>{
    console.log(id);
    for(i=0; i<arrayTareas.length;i++){
        let Ver = arrayTareas[i].id
        if(id==Ver){
            pos= i
        }
    }
    document.getElementById("areaModalDescripcion").innerHTML=` <div class="modal fade" id="texto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                    <div class="modal-dialog" role="document">
                                                                        <div class="modal-content">
                                                                            <div class="modals">
                                                                                <div class="modal-header">
                                                                                    <h5 class="modal-title" id="exampleModalLabel">Descripcion tarea</h5>
                                                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                                            <span aria-hidden="true">&times;</span>
                                                                                        </button>
                                                                                </div>
                                                                            </div>
                                                                            <div class="modal-body">
                                                                                <input type="text" class="form-control" id="tituloTarea" placeholder="${arrayTareas[pos].titulo}" readonly><br>
                                                                                <textarea name="textarea" rows="5" cols="25" class="form-control" id="descripcionTarea" placeholder="${arrayTareas[pos].descripcion}" readonly></textarea>
                                                                            </div>
                                                                            <div class="modal-footer">
                                                                            <button type="button" data-dismiss="modal" class="btn btn-primary">Cerrar</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>`
}

let borrarTarea=(id)=>{
    arrayTareas = arrayTareas.filter((tarea) => tarea.id !== id);
    Refrescar();
}

let validar=()=>{
    let string = document.getElementById("tituloTarea").value;
    if(string.length>0){
        document.getElementById("boton").innerHTML=`<button type="button" data-dismiss="modal" onkeyup="validar()" onclick="AgregarTarea(document.getElementById('tituloTarea').value, document.getElementById('descripcionTarea').value)" class="btn btn-primary">Guardar</button>`
    }else{
        document.getElementById("boton").innerHTML=`<button type="button" data-dismiss="modal" onkeyup="validar()" onclick="AgregarTarea(document.getElementById('tituloTarea').value, document.getElementById('descripcionTarea').value)" class="btn btn-primary" disabled>Guardar</button>`
    }
}

let fastestTask=()=>{
    let masRapida= 1000000000000000;
    let tareaMasRapida;
    for(let i=0;i<arrayTareas.length;i++){
        if(arrayTareas[i].terminado<masRapida && arrayTareas[i].status==true){
            masRapida=arrayTareas[i].terminado;
            tareaMasRapida=arrayTareas[i];
        }
    };
    return tareaMasRapida.id;
}