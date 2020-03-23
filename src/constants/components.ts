import ShowFieldsOne from 'components/widgets/showFields/ShowFieldsOne/ShowFieldsOne';
import ShowFieldsThree from 'components/widgets/showFields/ShowFieldsThree/ShowFieldsThree';
import ShowFieldsFour from 'components/widgets/showFields/ShowFieldsFour/ShowFieldsFour';
import ToolWidget from 'components/widgets/ToolWidget/ToolWidget';
import TSBasicString from 'components/widgets/timeSeries/TSBasicString/TSBasicString';
import TSBasicNumeric from 'components/widgets/timeSeries/TSBasicNumeric/TSBasicNumeric';
import TSWideNumeric from 'components/widgets/timeSeries/TSWideNumeric/TSWideNumeric';
import { TSFancyNumeric } from 'components/widgets/timeSeries/TSFancyNumeric/TSFancyNumeric';

export const COMPONENTS: any = {
  tSFancyNumeric: TSFancyNumeric,
  showFieldsOne: ShowFieldsOne,
  showFieldsThree: ShowFieldsThree,
  showFieldsFour: ShowFieldsFour,
  toolWidget: ToolWidget,
  tSBasicString: TSBasicString,
  tSBasicNumeric: TSBasicNumeric,
  timeSeriesWideNumeric: TSWideNumeric,
};
