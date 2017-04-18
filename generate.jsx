#include json2.js

// Learn how to change text
// Learn how to save PNG
// Learn how to read JSON

var obj = loadJson('CardsData.json');

var labelGroup                  = app.activeDocument.layerSets.getByName('DynamicLabels');
var staticLabelGroup            = app.activeDocument.layerSets.getByName('StaticLabels_Universal');
var staticLabelGroup_special    = app.activeDocument.layerSets.getByName('StaticLabels_Special');
var staticLabelGroup_nonspecial = app.activeDocument.layerSets.getByName('StaticLabels_NonSpecial');

// should be ordered as full dots 1-6 and then empty dots 1-6
var dotGroup = app.activeDocument.layerSets.getByName('ComboDots');

// should be ordered as R,G,B,Y
// inside of which attack, block, dodge, throw
var moveImageGroup = app.activeDocument.layerSets.getByName('MoveImages');

// I swear to god I'll kill whoever that changes the PSD layer sequence without letting me know.
// ...with a spoon, I swear to god.
var charnameLayer   = labelGroup.layers[0];
var move1Layer      = labelGroup.layers[1];
var move2Layer      = labelGroup.layers[2];
var cardNum1Layer   = labelGroup.layers[3];
var cardNum2Layer   = labelGroup.layers[4];
var hitNumLayer     = labelGroup.layers[5];
var combNumLayer    = labelGroup.layers[6];
var meterNumLayer   = labelGroup.layers[7];
var meter2NumLayer  = labelGroup.layers[8];
var nextComboLayer  = labelGroup.layers[9];
var nextCombo2Layer = labelGroup.layers[10];
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
	charnameLayer.textItem.contents   = cards[index].character;
	move1Layer.textItem.contents      = cards[index].move1;
	move2Layer.textItem.contents      = cards[index].move2;
	cardNum1Layer.textItem.contents   = cards[index].card_number;
	cardNum2Layer.textItem.contents   = cards[index].card_number;
	hitNumLayer.textItem.contents     = cards[index].hit;
	meterNumLayer.textItem.contents   = cards[index].meter;
	meter2NumLayer.textItem.contents  = cards[index].meter2;
	combNumLayer.textItem.contents    = cards[index].combo;
	nextComboLayer.textItem.contents  = cards[index].next_in_combo;
	nextCombo2Layer.textItem.contents = cards[index].next_in_combo2;
	chipLayer.textItem.contents           = cards[index].chip;
	if(cards[index].card_number == 'J' || cards[index].card_number == 'Q' || cards[index].card_number == 'K')
	{
		setSpecialVisibilities(true);
	}
	else
	{
		setSpecialVisibilities(false);
	}
	processSingleCardDots(index, cards);
	setMoveImage(index, cards);
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
	cardNum2Layer.visible = (!isSpecial);
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

function setMoveImage(index, cards)
{
	for(var i = 0; i < 16; i++)
	{
		moveImageGroup.layers[i].visible = false;
	}

	if(cards[index].character == "Cassie")
	{
		if(cards[index].move_image == "Attack")
		{
			moveImageGroup.layers[0].visible = true;
		}
		if(cards[index].move_image == "Throw")
		{
			moveImageGroup.layers[1].visible = true;
		}
		if(cards[index].move_image == "Dodge")
		{
			moveImageGroup.layers[2].visible = true;
		}
		if(cards[index].move_image == "Block")
		{
			moveImageGroup.layers[3].visible = true;
		} 
	}
	if(cards[index].character == "Mascara")
	{
		if(cards[index].move_image == "Attack")
		{
			moveImageGroup.layers[4].visible = true;
		}
		if(cards[index].move_image == "Throw")
		{
			moveImageGroup.layers[5].visible = true;
		}
		if(cards[index].move_image == "Dodge")
		{
			moveImageGroup.layers[6].visible = true;
		}
		if(cards[index].move_image == "Block")
		{
			moveImageGroup.layers[7].visible = true;
		} 
	}
	if(cards[index].character == "Alexandre")
	{
		if(cards[index].move_image == "Attack")
		{
			moveImageGroup.layers[8].visible = true;
		}
		if(cards[index].move_image == "Throw")
		{
			moveImageGroup.layers[9].visible = true;
		}
		if(cards[index].move_image == "Dodge")
		{
			moveImageGroup.layers[10].visible = true;
		}
		if(cards[index].move_image == "Block")
		{
			moveImageGroup.layers[11].visible = true;
		} 
	}
	if(cards[index].character == "Carson")
	{
		if(cards[index].move_image == "Attack")
		{
			moveImageGroup.layers[12].visible = true;
		}
		if(cards[index].move_image == "Throw")
		{
			moveImageGroup.layers[13].visible = true;
		}
		if(cards[index].move_image == "Dodge")
		{
			moveImageGroup.layers[14].visible = true;
		}
		if(cards[index].move_image == "Block")
		{
			moveImageGroup.layers[15].visible = true;
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
//alert(labelGroup.name);