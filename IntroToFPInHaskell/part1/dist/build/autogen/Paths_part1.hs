module Paths_part1 (
    version,
    getBinDir, getLibDir, getDataDir, getLibexecDir,
    getDataFileName, getSysconfDir
  ) where

import qualified Control.Exception as Exception
import Data.Version (Version(..))
import System.Environment (getEnv)
import Prelude

catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
catchIO = Exception.catch

version :: Version
version = Version [0,1,0,0] []
bindir, libdir, datadir, libexecdir, sysconfdir :: FilePath

bindir     = "/Users/alex/Library/Haskell/bin"
libdir     = "/Users/alex/Library/Haskell/ghc-7.10.2-x86_64/lib/part1-0.1.0.0"
datadir    = "/Users/alex/Library/Haskell/share/ghc-7.10.2-x86_64/part1-0.1.0.0"
libexecdir = "/Users/alex/Library/Haskell/libexec"
sysconfdir = "/Users/alex/Library/Haskell/etc"

getBinDir, getLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "part1_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "part1_libdir") (\_ -> return libdir)
getDataDir = catchIO (getEnv "part1_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "part1_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "part1_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "/" ++ name)
