#include json2.js

// Learn how to change text
// Learn how to save PNG
// Learn how to read JSON

var obj = loadJson('CardsData.json');

var labelGroup = app.activeDocument.layerSets.getByName('DynamicLabels');

// should be ordered as full dots 1-6 and then empty dots 1-6
var dotGroup = app.activeDocument.layerSets.getByName('chipDots');

// should be ordered as R,G,B,Y
// inside of which attack, block, dodge, throw
var moveImageGroup = app.activeDocument.layerSets.getByName('MoveImages');

// I swear to god I'll kill whoever that changes the PSD layer sequence without letting me know.
// ...with a spoon, I swear to god.
var charnameLayer  = labelGroup.layers[0];
var move1Layer     = labelGroup.layers[1];
var move2Layer     = labelGroup.layers[2];
var cardNum1Layer  = labelGroup.layers[3];
var cardNum2Layer  = labelGroup.layers[4];
var hitNumLayer    = labelGroup.layers[5];
var chipNumLayer   = labelGroup.layers[6];
var meterNumLayer  = labelGroup.layers[7];
var nextComboLayer = labelGroup.layers[8];

var 

(function main()
{
	var obj = loadJson('Cards.json');
	var cards = obj.cards;

	for(var i = 0; i < cards.length; i++)
	{
		processSingleCard(i, cards);
	}
})();


function processSingleCard(index, cards)
{
	charnameLayer.textItem.contents  = cards[index].character;
	move1Layer.textItem.contents     = cards[index].move1;
	move2Layer.textItem.contents     = cards[index].move2;
	cardNum1Layer.textItem.contents  = cards[index].card_number;
	cardNum2Layer.textItem.contents  = cards[index].card_number;
	hitNumLayer.textItem.contents    = cards[index].hit;
	meterNumLayer.textItem.contents  = cards[index].meter;
	chipNumLayer.textItem.contents   = cards[index].chip;
	nextComboLayer.textItem.contents = cards[index].next_in_combo;
	precessSingleCardDots(index, cards);
	savePng(index);
}

function precessSingleCardDots(index, cards)
{
	var chip = cards[index].chip;
	var chipMax = cards[index].max_chip;

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

function decideMoveImage(index, cards)
{

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

function savePng(name)
{
	var doc = app.activeDocument;
	var file = new File(doc.path + '/Generated/Card_' + name + '.png');

	var opts = new PNGSaveOptions();
	doc.saveAs(file, opts, true);
}
//alert(labelGroup.name);