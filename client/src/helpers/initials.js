
function initials ( name )   {
  return name.split(' ').map( ( n ) => n[0] ).join('').toUpperCase();   
}

module.exports = initials;