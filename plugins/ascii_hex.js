var hexadecimal = document.getElementById("hexadecimal");
var ascii = document.getElementById("ascii");

hexadecimal.addEventListener("input", function(){Hex2Ascii(this.id, this.value);});
ascii.addEventListener("input", function(){Ascii2Hex(this.id, this.value);});

function Hex2Ascii(id, value)
{      
    var tmp = "";
    var hex = 0x00;
    var shift = 0; 
      
    for(var i = 0; i < value.length; i++)
    {
        //console.log(i);
        
        // Convert the character to dec
        c = value.charCodeAt(i);
        
        //console.log(c);
          
        // Valid character ?
        if((c >= 0x30) && (c <= 0x39))
        {
            hex |= ((c - 0x30) << (4 * (1 - shift)));
            shift++;
        }
        else if((c >= 0x41) && (c <= 0x46))
        {
            hex |= (((c - 0x41) + 0x0A) << (4 * (1 - shift)));
            shift++;
        }
        else if((c >= 0x61) && (c <= 0x66))
        {            
            hex |= (((c - 0x61) + 0x0A) << (4 * (1 - shift)));
            shift++;
        }
        else
        {
            hex = 0x00;
            shift = 0;
        }
          
        //console.log("i: " + i + " | value[i]:" + value[i] + " | hex: " + hex + " | shift:" + shift); 
        
        // Two characters valid ?
        if(shift == 2)
        {
            //console.log(hex);
              
            // Displayable character ?
            if((hex >= 0x20) && (hex < 0x7F))
            {
              tmp += String.fromCharCode(hex);
            }
            else
            {
              // Non displayable character (display a dot instead)
              tmp += '.'    
            }
            
            hex = 0x00;
            shift = 0;
        }
      
        // Refresh text area content
        ascii.value = tmp;
    }
}

function Ascii2Hex(id, value)
{
    var tmp = "";
    
    for(var i = 0; i < value.length; i++)
    {        
        s = value.charCodeAt(i).toString(16)
        
        // Add zero padding ?
        if(s.length < 2)
        {
            s = "0" + s; 
        }
        
        tmp += (s + " ");
    }
    
    // Refresh text area content
    hexadecimal.value = tmp.toUpperCase();
}