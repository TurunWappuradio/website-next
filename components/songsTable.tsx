import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

export const SongsTable = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  // Fetch tracklist on pageload on the client to have the most recent data,
  // static site generation would cause stale data.
  useEffect(() => {
    const fn = async () => {
      try {
        const tracklist = await fetchTracklist();
        setTracks(tracklist);
      } catch (err) {
        setError(err.toString());
      }
    };
    fn();
  }, []);

  const columns: ColumnDef<Track>[] = [
    { accessorKey: 'title', header: 'Kappale', size: 360 },
    { accessorKey: 'artist', header: 'Artisti', size: 260 },
    { accessorKey: 'album', header: 'Albumi', size: 320 },
    { accessorKey: 'length', header: 'Kesto', size: 100 },
  ];

  const table = useReactTable({
    data: tracks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const parentRef = useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 12,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-4 text-red-800">
        Failed to load songs: {error}
      </div>
    );
  }

  const loading = tracks.length === 0;

  return (
    <div className="bg-radio-bg200 h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-radio-bg">
        <div className="flex max-w-6xl mx-auto">
          {table.getFlatHeaders().map((h) => (
            <div
              key={h.id}
              className="px-3 py-2 select-none cursor-pointer hover:bg-gray-50 shrink-0"
              style={{ width: h.getSize() }}
              onClick={h.column.getToggleSortingHandler()}
              role="button"
            >
              <div className="text-radio-accent200 font-bold">
                {flexRender(h.column.columnDef.header, h.getContext())}
                {{
                  asc: '▲',
                  desc: '▼',
                }[h.column.getIsSorted() as string] ?? null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div ref={parentRef} className="overflow-auto bg-radio-bg200">
        {loading ? (
          <div className="p-4 text-sm text-gray-600 max-w-6xl mx-auto">
            Ladataan biisejä...
          </div>
        ) : (
          <div
            className="relative max-w-6xl mx-auto"
            style={{
              height: totalSize,
            }}
          >
            {virtualItems.map((v) => {
              const row = table.getRowModel().rows[v.index];
              if (!row) return null;
              return (
                <div
                  key={row.id}
                  className="border-b border-b-gray-100"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${v.start}px)`,
                    height: v.size,
                  }}
                >
                  <div className="flex items-center border-b border-gray-100">
                    {row.getVisibleCells().map((cell) => (
                      <div
                        key={cell.id}
                        className="px-3 py-2 text-sm text-gray-900 shrink-0"
                        style={{ width: cell.column.getSize() }}
                        title={String(cell.getValue() ?? '')}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

interface Track {
  title: string;
  artist: string;
  album: string;
  length: string; // mm:ss
}

const fetchTracklist = async (): Promise<Track[]> => {
  const res = await fetch('https://json.turunwappuradio.com/tracklist.json');
  const tracks = (await res.json()) as Track[];
  // filter empty lines
  return tracks.filter((t) => t.title);
};
