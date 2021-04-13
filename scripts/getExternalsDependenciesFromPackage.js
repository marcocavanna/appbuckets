import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';


export default function getExternalsDependenciesFromPackage() {
  /** Build the Path to package.json from cwd */
  const pkgPath = resolve(process.cwd(), 'package.json');

  /** If file doesn't exists return an empty array */
  if (!existsSync(pkgPath)) {
    return [];
  }

  try {
    /** Try to parse the Json File */
    const parsedPkg = JSON.parse(readFileSync(pkgPath).toString());

    /** Get dependencies array */
    const dependencies = [
      ...Object.keys(parsedPkg.peerDependencies || {}),
      ...Object.keys(parsedPkg.dependencies || {})
    ];

    /** Return direct package and all specific import */
    return [
      ...dependencies,
      ...dependencies.map(dep => new RegExp(`^${dep}\/.+$`))
    ];
  }
  catch (error) {

    global.console.log(error);

    throw new Error([
      'package.json has been found, but an error occurred while parsing it.\n'
      + `${(error).name}`
    ].join(' '));
  }
}
