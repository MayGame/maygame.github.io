var ask_for_lever = new Action(
    function() {
        console.log('act')
        lever_hint.style.backgroundColor='green';
    },
    function () {
        console.log('lever_calc')
        return {};
    }

)
actions.push({name: 'ask_for_lever',action: ask_for_lever, error_margin:0})
function lever_pressed() {
    console.log('lever pressed');
}