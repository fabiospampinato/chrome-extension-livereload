
/* MAIN */

//TODO: Maybe move most of these to a dedicated standalone package

const getDirectoryEntries = async ( directory: DirectoryEntry ): Promise<FileSystemEntry[]> => {

  return new Promise ( ( resolve, reject ) => {

    return directory.createReader ().readEntries ( resolve, reject );

  });

};

const getDirectoryFiles = async ( directory: DirectoryEntry ): Promise<FileEntry[]> => {

  const entries = await getDirectoryEntries ( directory );
  const filesGroups = await Promise.all ( entries.map ( entry => isDirectory ( entry ) ? getDirectoryFiles ( entry ) : isFile ( entry ) ? [entry] : [] ) );
  const files = filesGroups.flat ();

  return files;

};

const getDirectoryHashish = async ( directory: DirectoryEntry ): Promise<string> => {

  const files = await getDirectoryFiles ( directory );
  const metadatas = await Promise.all ( files.map ( getFileMetadata ) );
  const timestamps = metadatas.map ( metadata => metadata.modificationTime.getTime () );
  const hashish = files.map ( ( file, index ) => `${file.name}${timestamps[index]}` ).join ();

  return hashish;

};

const getExtensionDirectory = async (): Promise<DirectoryEntry> => {

  return new Promise ( resolve => {

    chrome.runtime.getPackageDirectoryEntry ( resolve );

  });

};

const getFileMetadata = async ( file: FileSystemEntry ): Promise<Metadata> => {

  return new Promise<Metadata> ( ( resolve, reject ) => {

    return file.getMetadata ( resolve, reject );

  });

};

const isDevelopment = async (): Promise<boolean> => {

  const self = await chrome.management.getSelf ();
  const development = self.installType === 'development';

  return development;

};

const isDirectory = ( entry: FileSystemEntry ): entry is DirectoryEntry => {

  return entry.isDirectory;

};

const isFile = ( entry: FileSystemEntry ): entry is FileEntry => {

  return entry.isFile;

};

/* EXPORT */

export {getDirectoryEntries, getDirectoryFiles, getDirectoryHashish, getExtensionDirectory, getFileMetadata, isDevelopment, isDirectory, isFile};
