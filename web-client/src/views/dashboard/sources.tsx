import { FileType } from "~/lib/sources/file-entries.ts";
import { SplitPane } from "~/components/split-pane";
import { Directory } from "~/components/sources/directory.tsx";
import { SourcePane } from "~/components/sources/source-pane";

export default function Sources() {
  return (
    <SplitPane
      defaultPrefix="sources"
      initialSizes={[22, 78]}
      defaultMinSizes={[70, 200]}
    >
      <div class="overflow-hidden">
        <Directory
          defaultPath="."
          defaultSize={0n}
          defaultFileType={FileType.DIR}
        />
      </div>
      <SourcePane />
    </SplitPane>
  );
}
