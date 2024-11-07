import { FhirApi } from './utils';


export const findPossibleMatches = async (count: number) => {
  const res = (await FhirApi({
    url: `/$mdm-query-links?_offset=0&_count=${count}`,
  })).data;
  console.log(res.parameter);
  const matches = [];
  for (const p of res.parameter) {
    if (p.name === 'link') {
      // matches.push(p);
      const obj: any = {};
      p.part.map((part: any) => {
        obj[part.name] = part.valueString || part.valueBoolean || '';
      });
      matches.push(obj);
    }
  }
  return matches;
};


export const linkRecords = async (goldenRecord: string, sourceRecord: string) => {
  const res = await FhirApi({
    url: '/$mdm-create-link',
    method: 'POST',
    data: JSON.stringify({
      'resourceType': 'Parameters',
      'parameter': [{
        'name': 'goldenResourceId',
        'valueString': `Patient/${goldenRecord}`,
      }, {
        'name': 'resourceId',
        'valueString': `Patient/${sourceRecord}`,
      }, {
        'name': 'matchResult',
        'valueString': 'MATCH',
      }],
    }),
  });
  return res;
};

export const getDuplicateGoldenRecords = async (count: number) => {
  const res = (await FhirApi({
    url: `/$mdm-duplicate-golden-resources?_offset=0&_count=${count}`,
  })).data;
  // console.log(res.parameter);
  const duplicates = [];
  for (const p of res.parameter) {
    if (p.name === 'link') {
      // duplicates.push(p);
      const obj: any = {};
      p.part.map((part: any) => {
        obj[part.name] = part.valueString || part.valueBoolean || '';
      });
      duplicates.push(obj);
    }
  }
  console.log(duplicates);
  return duplicates;
};

// getDuplicateGoldenRecords(10)

export const mergeRecords = async (from: string, to: string) => {
  const res = await FhirApi({
    url: '/$mdm-merge-golden-resources',
    method: 'POST',
    data: JSON.stringify({
      'resourceType': 'Parameters',
      'parameter': [{
        'name': 'fromGoldenResourceId',
        'valueString': `Patient/${from}`,
      }, {
        'name': 'toGoldenResourceId',
        'valueString': `Patient/${to}`,
      }],
    }),
  });
  return res;
};



