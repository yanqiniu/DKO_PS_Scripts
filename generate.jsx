#include json2.js

// Learn how to change text
// Learn how to save PNG
// Learn how to read JSON

var labelGroup                  = app.activeDocument.layerSets.getByName('DynamicLabels');
var staticLabelGroup            = app.activeDocument.layerSets.getByName('StaticLabels_Universal');
var staticLabelGroup_special    = app.activeDocument.layerSets.getByName('StaticLabels_Special');
var staticLabelGroup_nonspecial = app.activeDocument.layerSets.getByName('StaticLabels_NonSpecial');
var templateGroup               = app.activeDocument.layerSets.getByName('Templates');
var borderGroup                 = app.activeDocument.layerSets.getByName('Borders');

// should be ordered as full dots 1-6 and then empty dots 1-6
var dotGroup = app.activeDocument.layerSets.getByName('ComboDots');

// should be ordered as R,G,B,Y
// inside of which attack, block, dodge, throw
var moveImageGroup1 = app.activeDocument.layerSets.getByName('MoveImages');
var moveImageGroup2 = app.activeDocument.layerSets.getByName('MoveImages_Bot');
var moveImageGroupMid = app.activeDocument.layerSets.getByName('MoveImages_Mid');

// I swear to god I'll kill whoever that changes the PSD layer sequence without letting me know.
// ...with a spoon, I swear to god.
var move1Layer      = labelGroup.layers[0];
var move2Layer      = labelGroup.layers[1];
var cardNum1Layer   = labelGroup.layers[2];
var cardNum2Layer   = labelGroup.layers[3];
var hitNumLayer     = labelGroup.layers[4];
var combNumLayer    = labelGroup.layers[5];
var meterNumLayer   = labelGroup.layers[6];
var meter2NumLayer  = labelGroup.layers[7];
var nextComboLayer  = labelGroup.layers[8];
var nextCombo2Layer = labelGroup.layers[9];
var specialLayer    = labelGroup.layers[10];
var descrpLayer     = labelGroup.layers[11];
var chipLayer       = labelGroup.layers[12];

(function main()
{
	var obj = loadJson('Cards.json');
	var cards = obj.cards;

	for(var i = 0; i < cards.length; i++)
	{
		processSingleCard(i, cards);
	}

	alert("Finished all cards!");
})();


function processSingleCard(index, cards)
{
	move1Layer.textItem.contents      = cards[index].move1;
	move1Layer.textItem.color 		  = getMoveColor(cards[index].move1, false);
	move2Layer.textItem.contents      = cards[index].move2;
	move2Layer.textItem.color 		  = getMoveColor(cards[index].move2, false);

	cardNum1Layer.textItem.contents   = cards[index].card_number;
	cardNum2Layer.textItem.contents   = cards[index].card_number;
	hitNumLayer.textItem.contents     = cards[index].hit;
	meterNumLayer.textItem.contents   = cards[index].meter;
	meter2NumLayer.textItem.contents  = cards[index].meter2;
	combNumLayer.textItem.contents    = cards[index].combo;
	nextComboLayer.textItem.contents  = cards[index].next_in_combo;
	nextCombo2Layer.textItem.contents = cards[index].next_in_combo2;
	chipLayer.textItem.contents       = cards[index].chip;
	specialLayer.textItem.contents    = cards[index].special_name;
	if(chipLayer.textItem.contents == "(0)")
	{
		chipLayer.visible = false;
	}
	else
	{
		chipLayer.visible = true;
	}


	resetImages(true, true, true);
	if(cards[index].card_number == '10' || cards[index].card_number == '11' || cards[index].card_number == '12')
	{
		setMoveImage(cards[index].character, cards[index].move1, moveImageGroupMid);
		descrpLayer.textItem.contents = cards[index].description;
		setSpecialVisibilities(true);
		move1Layer.textItem.color = getMoveColor("", true);

	}
	else
	{
		setMoveImage(cards[index].character, cards[index].move1, moveImageGroup1);
		setMoveImage(cards[index].character, cards[index].move2, moveImageGroup2);
		setSpecialVisibilities(false);
	}
	setBorder(cards[index].character);
	processSingleCardDots(index, cards);
	savePng(cards[index].character, cards[index].card_number);
}

function setSpecialVisibilities(isSpecial)
{
	staticLabelGroup_special.visible = isSpecial;
	staticLabelGroup_nonspecial.visible = (!isSpecial);
	descrpLayer.visible = isSpecial;
	move2Layer.visible = (!isSpecial);
	nextCombo2Layer.visible = (!isSpecial);
	meter2NumLayer.visible = (!isSpecial);
	specialLayer.visible = isSpecial;
}

function processSingleCardDots(index, cards)
{
	var chip = cards[index].combo;
	var chipMax = cards[index].max_combo;

	for(var i = 0; i < 12; i++)
	{
		dotGroup.layers[i].visible = false;
	}

	for(var i = 0; i < 6; i++)
	{
		if(chip > i)
		{
			dotGroup.layers[i].visible = true;
		}
	}

	for(var i = 6; i < 12; i++)
	{
		if(chipMax > (i - 6))
		{
			dotGroup.layers[i].visible = true;
		}
	}
}

function getMoveColor(move, isSpecial)
{
	if(isSpecial == true)
	{
		textColor = new SolidColor();
		textColor.rgb.red = 253;
		textColor.rgb.green = 221;
		textColor.rgb.blue = 63;
		return textColor;
	}
	else
	{
		textColor = new SolidColor();
		textColor.rgb.red = 255;
		textColor.rgb.green = 156;
		textColor.rgb.blue = 0;
		return textColor;

		/*
		textColor = new SolidColor();

		if(move == "Normal")
		{
			textColor.rgb.red = 255;
			textColor.rgb.green = 100;
			textColor.rgb.blue = 100;
		}
		else if(move == "Strong")
		{
			textColor.rgb.red = 255;
			textColor.rgb.green = 30;
			textColor.rgb.blue = 30;
		}
		else if(move == "Throw")
		{
			textColor.rgb.red = 30;
			textColor.rgb.green = 30;
			textColor.rgb.blue = 255;
		}
		else if(move == "Dodge")
		{
			textColor.rgb.red = 30;
			textColor.rgb.green = 255;
			textColor.rgb.blue = 30;
		}
		else if(move == "Block")
		{
			textColor.rgb.red = 0;
			textColor.rgb.green = 0;
			textColor.rgb.blue = 0;
		}
		else
		{
			textColor.rgb.red = 0;
			textColor.rgb.green = 0;
			textColor.rgb.blue = 0;
		}
		*/

		return textColor;
	}

}

function resetImages(reset1, reset2, resetMid)
{
	for(var i = 0; i < 16; i++)
	{
		if(reset1 == true)
		{
			moveImageGroup1.layers[i].visible = false;
		}
		if(reset2 == true)
		{
			moveImageGroup2.layers[i].visible = false;
		}
		if(resetMid == true)
		{
			moveImageGroupMid.layers[i].visible = false;
		}
	}
}

function setBorder(character)
{
	for(var i = 0; i < 4; i++)
	{
		borderGroup.layers[i].visible = false;
	}
	if(character == "Cassie")
	{
		borderGroup.layers[0].visible = true;
	}
	else if(character == "Mascara")
	{
		borderGroup.layers[1].visible = true;
	}
	else if(character == "Alexandre")
	{
		borderGroup.layers[2].visible = true;
	}
	else if(character == "Carson")
	{
		borderGroup.layers[3].visible = true;
	}

}

function setMoveImage(character, move, layerGroup)
{
	for(var i = 0; i < 16; i++)
	{
		layerGroup.layers[i].visible = false;
	}

	if(character == "Cassie")
	{
		if(move == "Attack" || 
			move == "Strong Attack")
		{
			layerGroup.layers[0].visible = true;
		}
		if(move == "Block")
		{
			layerGroup.layers[1].visible = true;
		}
		if(move == "Dodge")
		{
			layerGroup.layers[2].visible = true;
		}
		if(move == "Throw")
		{
			layerGroup.layers[3].visible = true;
		} 
	}
	else if(character == "Mascara")
	{
		if(move == "Attack" || 
			move == "Strong Attack")
		{
			layerGroup.layers[4].visible = true;
		}
		if(move == "Block")
		{
			layerGroup.layers[5].visible = true;
		}
		if(move == "Dodge")
		{
			layerGroup.layers[6].visible = true;
		}
		if(move == "Throw")
		{
			layerGroup.layers[7].visible = true;
		} 
	}
	else if(character == "Alexandre")
	{
		if(move == "Attack" || 
			move == "Strong Attack")
		{
			layerGroup.layers[8].visible = true;
		}
		if(move == "Block")
		{
			layerGroup.layers[9].visible = true;
		}
		if(move == "Dodge")
		{
			layerGroup.layers[10].visible = true;
		}
		if(move == "Throw")
		{
			layerGroup.layers[11].visible = true;
		} 
	}
	else if(character == "Carson")
	{
		if(move == "Attack" || 
			move == "Strong Attack")
		{
			layerGroup.layers[12].visible = true;
		}
		if(move == "Block")
		{
			layerGroup.layers[13].visible = true;
		}
		if(move == "Dodge")
		{
			layerGroup.layers[14].visible = true;
		}
		if(move == "Throw")
		{
			layerGroup.layers[15].visible = true;
		} 
	}

}

function loadJson(path)
{
	var script = new File($.fileName);
	var jsonFile = new File(script.path + '/' + path);

	jsonFile.open('r');
	var str = jsonFile.read();
	jsonFile.close();

	return JSON.parse(str);
}

function savePng(name, number)
{
	var doc = app.activeDocument;
	var file = new File(doc.path + '/Generated/Card_' + name + '_' + number + '.png');

	var opts = new PNGSaveOptions();
	doc.saveAs(file, opts, true);
}
