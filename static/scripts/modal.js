function toggleModal(override) {
    if (override !== undefined) {
        if(override){
            document.getElementById('modal-container').classList.remove('modal-container-hidden');
            document.getElementById('modal').classList.remove('modal-hidden');
        } else {
            document.getElementById('modal-container').classList.add('modal-container-hidden');
            document.getElementById('modal').classList.add('modal-hidden');
        }
    } 
}