import React from 'react';
import { getConfig } from '../../utils/hc-config';

const HcDeveloperConfigPane: React.FC = () => {
  const config = getConfig();

  // @ts-expect-error set the variable in a script in index.html and P.F.S.
  const hcContextRoot = globalThis.HC_CONTEXT_ROOT || 'false';

  return (
    <div className={'hc-dev-config-pane'}>
      <h3>Config Info</h3>
      <div>globalThis.HC_CONTEXT_ROOT [{hcContextRoot}]</div>
      <pre>{JSON.stringify(config, undefined, 2)}</pre>
    </div>
  );
};

export default HcDeveloperConfigPane;
