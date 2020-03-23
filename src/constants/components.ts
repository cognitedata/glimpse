import ShowFieldsOne from 'components/widgets/showFields/ShowFieldsOne/ShowFieldsOne';
import ShowFieldsThree from 'components/widgets/showFields/ShowFieldsThree/ShowFieldsThree';
import ShowFieldsFour from 'components/widgets/showFields/ShowFieldsFour/ShowFieldsFour';
import ToolWidget from 'components/widgets/ToolWidget/ToolWidget';
import TSBasicString from 'components/widgets/timeSeries/TSBasicString/TSBasicString';
import TSBasicNumeric from 'components/widgets/timeSeries/TSBasicNumeric/TSBasicNumeric';
import TSWideNumeric from 'components/widgets/timeSeries/TSWideNumeric/TSWideNumeric';
import { TSFancyNumeric } from 'components/widgets/timeSeries/TSFancyNumeric/TSFancyNumeric';
import TSTallNumeric from 'components/widgets/timeSeries/TSTallNumeric/TSTallNumeric';

export enum Widget {
  TSFANCYNUMERIC,
  SHOWFIELDSONE,
  SHOWFIELDSTHREE,
  SHOWFIELDSFOUR,
  TOOLWIDGET,
  TSBASICSTRING,
  TSBASICNUMERIC,
  TSWIDENUMERIC,
  TSTALLNUMERIC,
}

export const COMPONENTS: any = {
  [Widget.TSFANCYNUMERIC]: TSFancyNumeric,
  [Widget.SHOWFIELDSONE]: ShowFieldsOne,
  [Widget.SHOWFIELDSTHREE]: ShowFieldsThree,
  [Widget.SHOWFIELDSFOUR]: ShowFieldsFour,
  [Widget.TOOLWIDGET]: ToolWidget,
  [Widget.TSBASICSTRING]: TSBasicString,
  [Widget.TSBASICNUMERIC]: TSBasicNumeric,
  [Widget.TSWIDENUMERIC]: TSWideNumeric,
  [Widget.TSTALLNUMERIC]: TSTallNumeric,
};
